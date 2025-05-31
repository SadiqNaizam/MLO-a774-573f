import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelStatsGrid from '../components/Dashboard/FunnelStatsGrid';
import StatChartSection from '../components/Dashboard/StatChartSection';
import ReasonsGrid from '../components/Dashboard/ReasonsGrid';

/**
 * LeadsDashboardPage Component
 *
 * This page serves as the main view for the Leads Dashboard Overview.
 * It utilizes the DashboardLayout (implemented as MainAppLayout) to structure the page
 * with a sidebar, header, and main content area.
 * The main content area is populated by specific dashboard widgets:
 * - FunnelStatsGrid: Displays funnel statistics and sources chart.
 * - StatChartSection: Shows leads tracking line chart and related stats.
 * - ReasonsGrid: Presents reasons for lost leads and other miscellaneous data.
 *
 * The pageTitle prop passed to MainAppLayout determines the title displayed in the HeaderBar.
 * For this Leads Dashboard Overview, the title is set to "Leads Dashboard".
 */
const LeadsDashboardPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Leads Dashboard">
      {/* 
        The main content area of the dashboard is composed of several sections.
        These components are self-contained and manage their own data and presentation.
        They are arranged vertically with spacing handled by MainAppLayout's flex container.
      */}
      <FunnelStatsGrid />
      <StatChartSection />
      <ReasonsGrid />
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
