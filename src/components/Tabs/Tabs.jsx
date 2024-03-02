import { Tab, Tabs as ReactTabs, TabList, TabPanel } from "react-tabs";
import "./tabs.scss";
export const Tabs = ({ tabs, panels, onSelect }) => {
  return (
    <ReactTabs onSelect={onSelect}>
      <TabList>
        {tabs.map((label) => (
          <Tab key={label}>{label}</Tab>
        ))}
      </TabList>
      {panels.map((content, index) => (
        <TabPanel key={index}>{content}</TabPanel>
      ))}
    </ReactTabs>
  );
};
