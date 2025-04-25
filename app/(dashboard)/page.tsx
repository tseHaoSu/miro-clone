"use client";

import React, { use } from "react";

import { useOrganization } from "@clerk/nextjs";
import BoardList from "./_components/board-list/BoardList";
import EmptyOrg from "./_components/board-list/EmptyOrg";

interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
}

const Page = ({ searchParams }: DashboardPageProps) => {
  const params = use(searchParams);
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <div className="flex-1 h-screen p-6">Loading...</div>;
  }

  return (
    <div className="flex-1 h-screen p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={params} />
      )}
    </div>
  );
};

export default Page;
