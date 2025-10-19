export const validateAnalysisForm = (formData) => {
  const errors = {};

  if (!formData.address) {
    errors.address = 'Address is required';
  }

  if (!formData.energyConsumption) {
    errors.energyConsumption = 'Energy consumption is required';
  } else if (isNaN(formData.energyConsumption) || formData.energyConsumption <= 0) {
    errors.energyConsumption = 'Please enter a valid energy consumption (e.g., kWh)';
  }

  if (!formData.roofType) {
    errors.roofType = 'Roof type is required';
  }

  return errors;
};

export const validateInstallerForm = (formData) => {
  const errors = {};

  if (!formData.companyName) {
    errors.companyName = 'Company Name is required';
  }

  if (!formData.contactPerson) {
    errors.contactPerson = 'Contact Person is required';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
    errors.email = 'Invalid email address';
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?\d{10,15}$/.test(formData.phone)) { // Basic phone number validation
    errors.phone = 'Invalid phone number';
  }

  if (!formData.serviceAreas) {
    errors.serviceAreas = 'Service Areas are required';
  }

  return errors;
};
