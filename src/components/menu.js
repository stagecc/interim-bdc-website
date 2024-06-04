import React from "react"
import { Link } from 'gatsby'

export default function Menu() {
  return (
    <div style={{ border: `1px solid crimson` }}>
    <ul style={{ display: 'flex', flexDirection: 'row' }}>
      <li><Link to="/">Home</Link></li>
      <li>
        Use BDC
        <ul>
          <li><Link to="/use-bdc/explore">Explore BDC Data</Link></li>
          <li><Link to="/use-bdc/analyze">Analyze Data</Link></li>
          <li><Link to="/use-bdc/share">Share Data</Link></li>
          <li><Link to="/use-bdc/impute">Impute Genotypes</Link></li>
        </ul>
      </li>
      <li>
        User Resources
        <ul>
          <li><Link to="/user-resources/user-faqs">User FAQs</Link></li>
          <li><Link to="/user-resources/usage-costs">Usage Costs</Link></li>
          <li><Link to="/user-resources/documentation">Documentation</Link></li>
          <li><Link to="/user-resources/terms-of-use">Terms of Use</Link></li>
        </ul>
      </li>
      <li>
        News & Events
        <ul>
          <li><Link to="/news-and-events/published-research">Published Research</Link></li>
          <li><Link to="/news-and-events/news-coverage">News Coverage</Link></li>
          <li><Link to="/news-and-events/latest-updates">Latest Updates</Link></li>
          <li><Link to="/news-and-events/events">Events</Link></li>
        </ul>
      </li>
      <li>
        About
        <ul>
          <li><Link to="/about/overview">Overview</Link></li>
          <li><Link to="/about/research-communities">Research Communities</Link></li>
          <li><Link to="/about/key-collaborations">Key Collaborations</Link></li>
        </ul>
      </li>
      <li>
        Help & Support
        <ul>
          <li><Link to="/help-and-support/support">Support</Link></li>
          <li><Link to="/help-and-support/contact-us">Contact Us</Link></li>
        </ul>
      </li>
    </ul>
    </div>
  )
};