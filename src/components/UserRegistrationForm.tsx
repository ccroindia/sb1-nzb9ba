import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Select, Textarea, useToast } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserRegistrationForm = ({ userId, onComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherHusbandName: '',
    mobileNo: '',
    email: '',
    presentAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      stdCode: '',
    },
    permanentAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      stdCode: '',
    },
    joiningDate: '',
    dateOfBirth: '',
    education: '',
    languagesKnown: [],
    identityMark: '',
    bloodGroup: '',
    aadhaarNumber: '',
    profession: '',
    vehicleDetails: [{ make: '', model: '', rcNumber: '' }],
    localPoliceStation: '',
    policeStationNumber: '',
    witness1: { name: '', aadhaarNumber: '' },
    witness2: { name: '', aadhaarNumber: '' },
    referenceIdentificationNumber: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (type, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...formData,
        registrationComplete: true,
      });
      toast({
        title: 'Registration Complete',
        description: 'Your details have been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onComplete();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save registration details.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input name="fullName" value={formData.fullName} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Father's/Husband's Name</FormLabel>
          <Input name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Mobile No</FormLabel>
          <Input name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} />
        </FormControl>

        {/* Present Address */}
        <Box>
          <FormLabel>Present Address</FormLabel>
          <Input
            placeholder="Address Line 1"
            value={formData.presentAddress.line1}
            onChange={(e) => handleAddressChange('presentAddress', 'line1', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="Address Line 2"
            value={formData.presentAddress.line2}
            onChange={(e) => handleAddressChange('presentAddress', 'line2', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="City"
            value={formData.presentAddress.city}
            onChange={(e) => handleAddressChange('presentAddress', 'city', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="State"
            value={formData.presentAddress.state}
            onChange={(e) => handleAddressChange('presentAddress', 'state', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="Pincode"
            value={formData.presentAddress.pincode}
            onChange={(e) => handleAddressChange('presentAddress', 'pincode', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="STD Code"
            value={formData.presentAddress.stdCode}
            onChange={(e) => handleAddressChange('presentAddress', 'stdCode', e.target.value)}
          />
        </Box>

        {/* Permanent Address */}
        <Box>
          <FormLabel>Permanent Address</FormLabel>
          <Input
            placeholder="Address Line 1"
            value={formData.permanentAddress.line1}
            onChange={(e) => handleAddressChange('permanentAddress', 'line1', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="Address Line 2"
            value={formData.permanentAddress.line2}
            onChange={(e) => handleAddressChange('permanentAddress', 'line2', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="City"
            value={formData.permanentAddress.city}
            onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="State"
            value={formData.permanentAddress.state}
            onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="Pincode"
            value={formData.permanentAddress.pincode}
            onChange={(e) => handleAddressChange('permanentAddress', 'pincode', e.target.value)}
            mb={2}
          />
          <Input
            placeholder="STD Code"
            value={formData.permanentAddress.stdCode}
            onChange={(e) => handleAddressChange('permanentAddress', 'stdCode', e.target.value)}
          />
        </Box>

        <FormControl isRequired>
          <FormLabel>Joining Date</FormLabel>
          <Input name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Education</FormLabel>
          <Select name="education" value={formData.education} onChange={handleChange}>
            <option value="8th">8th</option>
            <option value="High School">High School</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Graduate">Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Languages Known</FormLabel>
          <Select
            name="languagesKnown"
            multiple
            value={formData.languagesKnown}
            onChange={(e) => setFormData({ ...formData, languagesKnown: Array.from(e.target.selectedOptions, option => option.value) })}
          >
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Telugu">Telugu</option>
            <option value="Marathi">Marathi</option>
            <option value="Tamil">Tamil</option>
            <option value="Urdu">Urdu</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Kannada">Kannada</option>
            <option value="Odia">Odia</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Assamese">Assamese</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Identity Mark</FormLabel>
          <Input name="identityMark" value={formData.identityMark} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Blood Group</FormLabel>
          <Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Aadhaar Number</FormLabel>
          <Input name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} maxLength={16} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Profession</FormLabel>
          <Input name="profession" value={formData.profession} onChange={handleChange} />
        </FormControl>

        {/* Vehicle Details */}
        <Box>
          <FormLabel>Vehicle Details</FormLabel>
          <Input
            placeholder="Make"
            value={formData.vehicleDetails[0].make}
            onChange={(e) => setFormData({
              ...formData,
              vehicleDetails: [{ ...formData.vehicleDetails[0], make: e.target.value }]
            })}
            mb={2}
          />
          <Input
            placeholder="Model"
            value={formData.vehicleDetails[0].model}
            onChange={(e) => setFormData({
              ...formData,
              vehicleDetails: [{ ...formData.vehicleDetails[0], model: e.target.value }]
            })}
            mb={2}
          />
          <Input
            placeholder="RC Number"
            value={formData.vehicleDetails[0].rcNumber}
            onChange={(e) => setFormData({
              ...formData,
              vehicleDetails: [{ ...formData.vehicleDetails[0], rcNumber: e.target.value }]
            })}
          />
        </Box>

        <FormControl isRequired>
          <FormLabel>Local Police Station</FormLabel>
          <Input name="localPoliceStation" value={formData.localPoliceStation} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Police Station Number</FormLabel>
          <Input name="policeStationNumber" value={formData.policeStationNumber} onChange={handleChange} />
        </FormControl>

        {/* Witness 1 */}
        <Box>
          <FormLabel>Witness 1</FormLabel>
          <Input
            placeholder="Name"
            value={formData.witness1.name}
            onChange={(e) => setFormData({
              ...formData,
              witness1: { ...formData.witness1, name: e.target.value }
            })}
            mb={2}
          />
          <Input
            placeholder="Aadhaar Number"
            value={formData.witness1.aadhaarNumber}
            onChange={(e) => setFormData({
              ...formData,
              witness1: { ...formData.witness1, aadhaarNumber: e.target.value }
            })}
            maxLength={16}
          />
        </Box>

        {/* Witness 2 */}
        <Box>
          <FormLabel>Witness 2</FormLabel>
          <Input
            placeholder="Name"
            value={formData.witness2.name}
            onChange={(e) => setFormData({
              ...formData,
              witness2: { ...formData.witness2, name: e.target.value }
            })}
            mb={2}
          />
          <Input
            placeholder="Aadhaar Number"
            value={formData.witness2.aadhaarNumber}
            onChange={(e) => setFormData({
              ...formData,
              witness2: { ...formData.witness2, aadhaarNumber: e.target.value }
            })}
            maxLength={16}
          />
        </Box>

        <FormControl isRequired>
          <FormLabel>Reference Identification Number</FormLabel>
          <Input name="referenceIdentificationNumber" value={formData.referenceIdentificationNumber} onChange={handleChange} />
        </FormControl>

        <Button type="submit" colorScheme="brand" mt={4}>
          Submit Registration
        </Button>
      </VStack>
    </Box>
  );
};

export default UserRegistrationForm;