import React from 'react';
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserManagement from '../components/admin/UserManagement';
import ContentManagement from '../components/admin/ContentManagement';
import AdminLogin from '../components/admin/AdminLogin';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box maxWidth="1200px" margin="auto" mt={8} p={4}>
      <Heading mb={6}>Admin Dashboard</Heading>
      <Tabs onChange={(index) => navigate(index === 0 ? '/admin/users' : '/admin/content')}>
        <TabList>
          <Tab>User Management</Tab>
          <Tab>Content Management</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Routes>
              <Route path="/" element={<AdminLogin />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/content" element={<ContentManagement />} />
            </Routes>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminDashboard;