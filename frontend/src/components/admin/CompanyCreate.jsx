import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Your Company Name</h1>
          <p className="text-gray-500 text-sm">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <div className="mb-6">
          <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
            Company Name
          </Label>
          <Input
            id="companyName"
            type="text"
            placeholder="JobHunt, Microsoft etc."
            className="mt-2"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/companies')}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="w-full sm:w-auto"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
