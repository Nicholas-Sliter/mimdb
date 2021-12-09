import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
//import "react-tabs/style/react-tabs.css";

import styles from "../../styles/components/ImageSelectorTabs.module.scss";



export default function ImageSelectorTabs({name, children}){
   //name is one of Poster or Backdrop

   return (
     <Tabs selectedTabClassName={styles.selected}>
       <TabList className={styles.tabList}>
         <Tab
           default
           selectedTabClassName={styles.selected}
           className={styles.tab}
         >
           Upload Custom {name}
         </Tab>
         <Tab selectedTabClassName={styles.selected} className={styles.tab}>
           Select Gradient {name}
         </Tab>
       </TabList>

       <TabPanel>{children[0]}</TabPanel>
       <TabPanel>{children[1]}</TabPanel>
     </Tabs>
   );


}