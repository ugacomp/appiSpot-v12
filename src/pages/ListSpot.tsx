import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Building2, Clock, Shield, MapPin, Upload, Image as ImageIcon, X, Check, ArrowLeft, DollarSign, Users } from 'lucide-react';
import SpotForm from '../components/SpotForm';
import ImageGallery from '../components/ImageGallery';
import toast from 'react-hot-toast';

const steps = [
  {
    id: 'spot-info',
    title: 'Spot Information',
    icon: Building2,
    description: 'Basic details about your spot'
  },
  {
    id: 'availability',
    title: 'Availability',
    icon: Clock,
    description: 'Set your operating hours'
  },
  {
    id: 'rules',
    title: 'Rules & Regulations',
    icon: Shield,
    description: 'Set guidelines for guests'
  },
  {
    id: 'location',
    title: 'Location',
    icon: MapPin,
    description: 'Address and directions'
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: Upload,
    description: 'Required certifications'
  },
  {
    id: 'images',
    title: 'Images',
    icon: ImageIcon,
    description: 'Photos of your spot'
  }
];

const ListSpot = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(steps[0].id);
  const [formData, setFormData] = useState({
    // Spot Information
    name: '',
    description: '',
    type: '',
    capacity: '',
    pricePerHour: '',
    squareFootage: '',
    features: {
      parking: false,
      wifi: false,
      accessibility: false,
      kitchen: false,
      soundSystem: false,
      restrooms: false
    },
    amenities: [] as string[],

    // Availability
    openingHours: {
      monday: { open: '09:00', close: '17:00', isOpen: true },
      tuesday: { open: '09:00', close: '17:00', isOpen: true },
      wednesday: { open: '09:00', close: '17:00', isOpen: true },
      thursday: { open: '09:00', close: '17:00', isOpen: true },
      friday: { open: '09:00', close: '17:00', isOpen: true },
      saturday: { open: '10:00', close: '15:00', isOpen: true },
      sunday: { open: '10:00', close: '15:00', isOpen: false }
    },
    advanceBooking: '7',
    minDuration: '1',
    maxDuration: '8',

    // Rules & Regulations
    rules: '',
    cancellationPolicy: '24',
    insuranceRequired: false,
    depositRequired: false,
    depositAmount: '',
    additionalRules: [] as string[],

    // Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    directions: '',
    parking: '',

    // Documents
    businessLicense: null as File | null,
    insuranceCertificate: null as File | null,
    safetyInspection: null as File | null,

    // Images
    images: [] as string[]
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Submit form data
      toast.success('Spot listed successfully!');
      navigate('/host/spots');
    } catch (error) {
      toast.error('Failed to list spot');
    }
  };

  const isStepComplete = (stepId: string) => {
    switch (stepId) {
      case 'spot-info':
        return !!(formData.name && formData.description && formData.type);
      case 'availability':
        return !!(formData.openingHours && formData.minDuration);
      case 'rules':
        return !!(formData.rules);
      case 'location':
        return !!(formData.address && formData.city && formData.state && formData.zipCode);
      case 'documents':
        return !!(formData.businessLicense || formData.insuranceCertificate);
      case 'images':
        return formData.images.length > 0;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'spot-info':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spot Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                  placeholder="e.g., Downtown Event Space"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors resize-none"
                  placeholder="Describe your spot in detail..."
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Spot Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                  >
                    <option value="">Select type</option>
                    <option value="venue">Venue</option>
                    <option value="studio">Studio</option>
                    <option value="office">Office Space</option>
                    <option value="outdoor">Outdoor Space</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleChange('capacity', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                      placeholder="Maximum number of guests"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Hour *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={formData.pricePerHour}
                      onChange={(e) => handleChange('pricePerHour', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Square Footage
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={formData.squareFootage}
                      onChange={(e) => handleChange('squareFootage', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                      placeholder="Total area in sq ft"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'availability':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Operating Hours</h3>
              <div className="space-y-6">
                {Object.entries(formData.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-6">
                    <div className="w-32">
                      <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={hours.isOpen}
                          onChange={(e) => handleChange('openingHours', {
                            ...formData.openingHours,
                            [day]: { ...hours, isOpen: e.target.checked }
                          })}
                          className="rounded border-gray-300 text-[#2DD4BF] focus:ring-[#2DD4BF] transition-colors"
                        />
                        <span className="ml-2 text-sm text-gray-700">Open</span>
                      </label>
                      {hours.isOpen && (
                        <>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => handleChange('openingHours', {
                              ...formData.openingHours,
                              [day]: { ...hours, open: e.target.value }
                            })}
                            className="px-4 py-2 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                          />
                          <span className="text-center text-gray-500">to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => handleChange('openingHours', {
                              ...formData.openingHours,
                              [day]: { ...hours, close: e.target.value }
                            })}
                            className="px-4 py-2 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Advance Booking (days)
                  </label>
                  <select
                    value={formData.advanceBooking}
                    onChange={(e) => handleChange('advanceBooking', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                  >
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Duration (hours)
                  </label>
                  <select
                    value={formData.minDuration}
                    onChange={(e) => handleChange('minDuration', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="8">8 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Duration (hours)
                  </label>
                  <select
                    value={formData.maxDuration}
                    onChange={(e) => handleChange('maxDuration', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                  >
                    <option value="4">4 hours</option>
                    <option value="8">8 hours</option>
                    <option value="12">12 hours</option>
                    <option value="24">24 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    House Rules *
                  </label>
                  <textarea
                    value={formData.rules}
                    onChange={(e) => handleChange('rules', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors resize-none"
                    placeholder="List your house rules..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cancellation Policy
                    </label>
                    <select
                      value={formData.cancellationPolicy}
                      onChange={(e) => handleChange('cancellationPolicy', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                    >
                      <option value="24">24 hours notice</option>
                      <option value="48">48 hours notice</option>
                      <option value="72">72 hours notice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Deposit
                    </label>
                    <div className="space-y-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.depositRequired}
                          onChange={(e) => handleChange('depositRequired', e.target.checked)}
                          className="rounded border-gray-300 text-[#2DD4BF] focus:ring-[#2DD4BF] transition-colors"
                        />
                        <span className="ml-2 text-sm text-gray-700">Require security deposit</span>
                      </label>
                      {formData.depositRequired && (
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="number"
                            value={formData.depositAmount}
                            onChange={(e) => handleChange('depositAmount', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                            placeholder="Deposit amount"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Additional Rules
                </label>
                <div className="space-y-3">
                  {formData.additionalRules.map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{rule}</span>
                      <button
                        type="button"
                        onClick={() => handleChange('additionalRules', formData.additionalRules.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const rule = prompt('Enter a new rule:');
                      if (rule) {
                        handleChange('additionalRules', [...formData.additionalRules, rule]);
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 border border-[#2DD4BF] text-sm font-medium rounded-lg text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white transition-colors"
                  >
                    + Add Rule
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                      placeholder="123 Main St"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleChange('zipCode', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors"
                      placeholder="12345"
                      pattern="[0-9]{5}"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Directions
                  </label>
                  <textarea
                    value={formData.directions}
                    onChange={(e) => handleChange('directions', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors resize-none"
                    placeholder="Provide detailed directions or special instructions..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parking Information
                  </label>
                  <textarea
                    value={formData.parking}
                    onChange={(e) => handleChange('parking', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] shadow-sm transition-colors resize-none"
                    placeholder="Describe parking options and instructions..."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              <p className="text-sm text-gray-500 mb-6">
                Please upload the following documents to verify your spot. All documents should be in PDF format.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business License
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#2DD4BF] transition-colors">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-[#2DD4BF] hover:text-[#26b8a5] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#2DD4BF]">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".pdf"
                            onChange={(e) => handleChange('businessLicense', e.target.files?.[0])}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Certificate
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#2DD4BF] transition-colors">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-[#2DD4BF] hover:text-[#26b8a5] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#2DD4BF]">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".pdf"
                            onChange={(e) => handleChange('insuranceCertificate', e.target.files?.[0])}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safety Inspection Certificate
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#2DD4BF] transition-colors">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-[#2DD4BF] hover:text-[#26b8a5] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#2DD4BF]">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".pdf"
                            onChange={(e) => handleChange('safetyInspection', e.target.files?.[0])}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'images':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ImageGallery
                images={formData.images}
                onChange={(images) => handleChange('images', images)}
                maxImages={10}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with right-aligned back button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">List Your Spot</h1>
            <p className="mt-2 text-gray- 600">Share your space with others and start earning.</p>
          </div>
          <button
            onClick={() => navigate('/host')}
            className="mt-4 sm:mt-0 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        {/* Guidelines Card */}
        <div className="bg-[#2DD4BF]/5 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-[#2DD4BF] mt-0.5" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Listing Guidelines</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                <li>• Provide accurate and detailed information about your space</li>
                <li>• Include clear rules and guidelines for guests</li>
                <li>• Set a fair hourly rate based on your location and amenities</li>
                <li>• Be responsive to booking requests and inquiries</li>
                <li>• Keep your calendar up to date</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute inset-0 top-1/2 transform -translate-y-1/2">
              <div className="h-0.5 w-full bg-gray-200"></div>
            </div>
            
            {steps.map((step, index) => {
              const isComplete = isStepComplete(step.id);
              const isCurrent = currentStep === step.id;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative flex flex-col items-center group ${
                    isComplete || isCurrent ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors ${
                    isComplete ? 'bg-green-500' :
                    isCurrent ? 'bg-[#2DD4BF]' :
                    'bg-gray-200'
                  }`}>
                    {isComplete ? (
                      <Check className="h-6 w-6 text-white" />
                    ) : (
                      <step.icon className={`h-6 w-6 ${
                        isCurrent ? 'text-white' : 'text-gray-500'
                      }`} />
                    )}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32">
                    <p className={`text-xs font-medium text-center ${
                      isCurrent ? 'text-[#2DD4BF]' :
                      isComplete ? 'text-green-500' :
                      'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mt-16">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                const currentIndex = steps.findIndex(step => step.id === currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1].id);
                }
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={currentStep === steps[0].id}
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => {
                const currentIndex = steps.findIndex(step => step.id === currentStep);
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1].id);
                } else {
                  handleSubmit();
                }
              }}
              className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5] transition-colors"
            >
              {currentStep === steps[steps.length - 1].id ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSpot;