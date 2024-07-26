import React from "react";
import { Grid } from '@mui/material/';
import { SupportCard } from './support-card'
import {
  BlogIcon,
  CommunityIcon,
  DocumentsIcon,
  HelpDeskIcon,
  UserIcon,
  VideosIcon
} from "../../components/icons";

const SupportContent = [
  {
    title: "User FAQs",
    icon: <UserIcon size={50} fill="var(--color-crimson)" />,
    description:"Read answers to common questions.",
    link: "/user-resources/user-faqs"
  },
  {
    title: "Knowledge Base",
    icon: <BlogIcon size={50} fill="var(--color-crimson)" />,
    description: "Search informational articles.",
    link: "https://bdcatalyst.freshdesk.com/support/solutions"
  },
  {
    title: "Documentation",
    icon: <DocumentsIcon size={50} fill="var(--color-crimson)" />,
    description: "Read the release notes and get more instructions.",
    link: "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation"
  },
  {
    title: "Forum",
    icon: <CommunityIcon size={50} fill="var(--color-crimson)" />,
    description:"Interact with the community or find answers.",
    link: "https://bdcatalyst.freshdesk.com/support/discussions"
  },
  {
    title: "Help Desk",
    icon: <HelpDeskIcon size={55} fill="var(--color-crimson)" />,
    description: "Contact us.",
    link: "/help-and-support/contact-us"
  },
  {
    title: "YouTube",
    icon: <VideosIcon size={45} fill="var(--color-crimson)" />,
    description: "Watch demos, webinars, and more.",
    link: "https://www.youtube.com/channel/UCGkmY5oNK8uFZzT8vV_9KgQ"
  }
];

export const SupportGrid = () => (
  <Grid container spacing={2} px="2rem">
    {
      SupportContent.map(( resource )=> (
        <SupportCard resource={resource}/>
      ))
    }
  </Grid>
)