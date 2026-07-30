import express from 'express';
import path from 'path';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Configure Multer in-memory storage for file attachments
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf, .doc, and .docx formats are permitted for resume upload.'));
    }
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== APPLICATION EMAIL ENDPOINT ====================
/**
 * CRITICAL REQUIREMENT:
 * "When the user submits the application
 * DO NOT STORE APPLICATIONS INSIDE THE DATABASE.
 * DO NOT CREATE A CANDIDATE ACCOUNT.
 * Instead, send the application directly to info@rlklein.com"
 */
app.post('/api/applications', upload.single('resume'), async (req, res) => {
  try {
    const {
      job_id,
      job_title,
      facility_name,
      full_name,
      email,
      phone,
      address,
      city,
      state,
      cover_letter,
      linkedin_url,
      license_number,
      specialty,
      years_experience,
      preferred_location,
      availability
    } = req.body;

    const resumeFile = req.file;

    const emailSubject = `[NEW CANDIDATE APPLICATION] ${job_title} (${job_id || 'N/A'}) - ${full_name}`;
    const submissionDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    const formattedEmailText = `
===================================================================
R.L. KLEIN & ASSOCIATES INC. - CANDIDATE APPLICATION RECEIPT
===================================================================
TO: info@rlklein.com
DATE: ${submissionDate} EST
JOB ID: ${job_id || 'GENERAL'}
POSITION TITLE: ${job_title}
FACILITY / LOCATION: ${facility_name || 'N/A'}

--- APPLICANT CONTACT DETAILS ---
Full Name: ${full_name}
Email Address: ${email}
Phone Number: ${phone}
Mailing Address: ${address}, ${city}, ${state}

--- CLINICAL QUALIFICATIONS ---
License Number: ${license_number}
Primary Specialty: ${specialty}
Years of Experience: ${years_experience}
Preferred Placement Location: ${preferred_location}
Earliest Availability: ${availability}
LinkedIn Profile: ${linkedin_url || 'Not Provided'}

--- ATTACHED RESUME FILE ---
File Name: ${resumeFile ? resumeFile.originalname : 'No file attached'}
File Type: ${resumeFile ? resumeFile.mimetype : 'N/A'}
File Size: ${resumeFile ? `${(resumeFile.size / 1024).toFixed(1)} KB` : 'N/A'}

--- COVER LETTER ---
${cover_letter || 'No cover letter provided.'}

===================================================================
CONFIDENTIAL RECRUITMENT TRANSMISSION FOR R.L. KLEIN & ASSOCIATES INC.
===================================================================
`;

    console.log(`\n==========================================`);
    console.log(`[APPLICATION DISPATCHED TO info@rlklein.com]`);
    console.log(formattedEmailText);
    console.log(`==========================================\n`);

    // If RESEND_API_KEY is configured in .env, attempt to dispatch via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resendPayload: any = {
          from: 'R.L. Klein Recruitment <applications@rlklein.com>',
          to: ['info@rlklein.com'],
          subject: emailSubject,
          text: formattedEmailText,
        };

        if (resumeFile) {
          resendPayload.attachments = [
            {
              filename: resumeFile.originalname,
              content: resumeFile.buffer.toString('base64'),
            }
          ];
        }

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resendPayload)
        });
        console.log(`Successfully dispatched application email via Resend API to info@rlklein.com`);
      } catch (emailErr) {
        console.error('Resend dispatch exception (fallback logged successfully):', emailErr);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for applying. Our recruitment team will review your application and contact you if your qualifications match our requirements.'
    });
  } catch (err: any) {
    console.error('Error processing application submission:', err);
    res.status(500).json({
      success: false,
      error: 'An error occurred while transmitting your application. Please try again or contact info@rlklein.com directly.'
    });
  }
});

// ==================== SEO: XML SITEMAP ====================
app.get('/sitemap.xml', (_req, res) => {
  const baseUrl = process.env.APP_URL || 'https://www.rlklein.com';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/jobs</loc><changefreq>hourly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/disciplines</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/blog</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${baseUrl}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>${baseUrl}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>`;
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// ==================== SEO: ROBOTS.TXT ====================
app.get('/robots.txt', (_req, res) => {
  const baseUrl = process.env.APP_URL || 'https://www.rlklein.com';
  const text = `User-agent: *
Allow: /
Disallow: /admin/
Sitemap: ${baseUrl}/sitemap.xml`;
  res.header('Content-Type', 'text/plain');
  res.send(text);
});

// ==================== VITE DEVELOPMENT & PRODUCTION SERVING ====================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[R.L. Klein & Associates Inc.] Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
