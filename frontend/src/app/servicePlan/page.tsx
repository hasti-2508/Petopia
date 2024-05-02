
import ServicePlan from '@/components/service/ServicePlan'
import { ServicePlanType } from '@/interfaces/serviceplan';
import axiosInstance from '@/utils/axios';
import { GetStaticProps } from 'next';
import React from 'react'



function page() {
  return (
    <div>
      <ServicePlan />
    </div>
  )
}

export default page
