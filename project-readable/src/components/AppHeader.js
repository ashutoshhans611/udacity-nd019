import _ from "lodash";
import React from "react";
import { Menu, Container, Dropdown } from "semantic-ui-react";

const AppHeader = props =>
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item header>Readable</Menu.Item>
      <Menu.Item as="a" href="/">
        Home
      </Menu.Item>

      <Dropdown item simple text="Category">
        <Dropdown.Menu>
          {_.map(props.categories, (category, key) =>
            <Dropdown.Item
              key={category.name}
              as="a"
              href={`/${category.name}`}
            >
              {category.name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  </Menu>;

export default AppHeader;
