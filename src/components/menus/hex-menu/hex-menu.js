import React, { useState } from "react";
import styled from "styled-components";
import {
  BrokenDnaIcon as ImputeGenomesIcon,
  ByodIcon as ShareIcon,
  DataBoltIcon as AnalyzeIcon,
  MagnifyingGlassIcon as ExploreIcon,
  JoinIcon,
  QuestionIcon as SupportIcon,
} from "../../icons";
import { useWindowWidth } from "../../../hooks";
import { Hexagon } from "./hexagon";
import { MenuItemDescription } from "./hex-menu-descriptions";

const hexagonItems = [
  {
    text: "Explore Data",
    description: "Explore the data in BDC (no login required)",
    icon: ExploreIcon,
    path: "/use-bdc/explore-data",
    id: "explore-data"
  },
  {
    text: "Analyze Data",
    description: "Set up private, secure workspaces for running analyses at scale",
    icon: AnalyzeIcon,
    path: "/use-bdc/analyze-data",
    id: "analyze-data"
  },
  {
    text: "Share Data",
    description:
      "Learn about using BDC as a data repository",
    icon: ShareIcon,
    path: "/use-bdc/share-data",
    id: "share-data"
  },
  {
    text: "Impute Genomes",
    description:
      "Upload phased or unphased GWAS genotypes and get phased and imputed genomes",
    icon: ImputeGenomesIcon,
    path: "https://imputation.biodatacatalyst.nhlbi.nih.gov/#!",
    id: "impute-genomes"
  },
  {
    text: "Join BDC",
    description: "Join the BDC community to stay up to date about BDC",
    icon: JoinIcon,
    path: "/join-bdc",
    id: "join-bdc"
  },
  {
    text: "Support",
    description:
      "Get support to advance your research in BDC",
    icon: SupportIcon,
    path: "/help-and-support/support",
    id: "support"
  },
];

const Wrapper = styled.div`
  // border: 1px solid #f99;
  // & * { border: 1px solid #99f; }
  margin-top: -10rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Descriptions = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MenuItems = styled.div`
  position: relative;
  flex: 1;
  height: 23rem;
`;

export const HexMenu = () => {
  const [index, setIndex] = useState(1);
  const { isCompact } = useWindowWidth();

  const handleHoverMenuItem = (newIndex) => (event) => setIndex(newIndex);

  return (
    <Wrapper>
      <Descriptions>
        {hexagonItems.map((item, i) => (
          <MenuItemDescription key={i} active={index === i}>
            {item.description}
          </MenuItemDescription>
        ))}
      </Descriptions>
      <MenuItems>
        {hexagonItems.map((tab, i) => (
          <Hexagon
            key={i}
            id={tab.id}
            path={tab.path}
            active={index === i}
            size={160}
            growOnActive={!isCompact}
            showtext={!isCompact}
            text={tab.text}
            icon={tab.icon}
            hoverHandler={handleHoverMenuItem(i)}
          />
        ))}
      </MenuItems>
    </Wrapper>
  );
};
