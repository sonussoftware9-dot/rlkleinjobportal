import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Job } from '../../types';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  jobSchema?: Job;
}

export const SEOHead: React.FC<SEOProps> = ({
  title = 'R.L. Klein & Associates Inc. | Healthcare Recruitment & Staffing',
  description = 'Connecting healthcare professionals with exceptional nursing, allied health, therapist, and physician positions across top US health systems.',
  canonicalUrl,
  ogType = 'website',
  jobSchema
}) => {
  const fullTitle = title.includes('R.L. Klein') ? title : `${title} | R.L. Klein & Associates Inc.`;
  const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.rlklein.com';
  const url = canonicalUrl || siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content="R.L. Klein & Associates Inc." />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Schema.org JobPosting JSON-LD if viewing a job */}
      {jobSchema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            "title": jobSchema.title,
            "description": jobSchema.job_description,
            "identifier": {
              "@type": "PropertyValue",
              "name": "R.L. Klein & Associates Inc.",
              "value": jobSchema.id
            },
            "datePosted": jobSchema.posted_date,
            "validThrough": jobSchema.application_deadline,
            "employmentType": jobSchema.employment_type === 'Travel Nursing' ? 'CONTRACTOR' : 'FULL_TIME',
            "hiringOrganization": {
              "@type": "Organization",
              "name": "R.L. Klein & Associates Inc.",
              "sameAs": "https://www.rlklein.com",
              "logo": "https://www.rlklein.com/logo.png"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": jobSchema.city,
                "addressRegion": jobSchema.state,
                "addressCountry": "US"
              }
            },
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": {
                "@type": "QuantitativeValue",
                "minValue": jobSchema.salary_min,
                "maxValue": jobSchema.salary_max,
                "unitText": jobSchema.salary_type.toUpperCase()
              }
            }
          })}
        </script>
      )}
    </Helmet>
  );
};
