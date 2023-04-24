import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const TabsComponent = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Stacking</Tab>
        <Tab>Unstaking</Tab>
        <Tab>Claim</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Stacking</p>
        </TabPanel>
        <TabPanel>
          <p>Unstaking</p>
        </TabPanel>
        <TabPanel>
          <p>Claim</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
