import React from "react"
import { Menu } from '../menus/menu'
import { Footer } from './'
import { Markdown } from '../mdxComponents'
import { menuItems } from "../../data/menu";
import "../../styles/normalize.css";
import "../../styles/customize.css";

export function Layout({ children }) {
  return (
    <Markdown>
      <Menu items={menuItems} />
      <div style={{
        margin: `0 auto`,
        maxWidth: 1000,
        padding: `0 1rem`,
      }}>
        <hr />
        {children}
        <Footer>
          footer links?
        </Footer>
      </div>
    </Markdown>
  )
};