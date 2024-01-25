import React from 'react'
import Stepper from 'react-stepper-horizontal';
import { useState } from 'react';
const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        address: '',
        permanentAddress: '',
        dob: '',
        mobile: '',
        gender: '',
        languages: [],
      });
      const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: files[0],
        }));
      };
      const handleCheckboxChange = (event) => {
        // Your logic for handling checkbox change goes here
      };
    
      const [currentStep, setCurrentStep] = useState(0);
    
      const steps = [
        { title: 'Personal Info' },
        { title: 'Patent Requirements' },
        { title: 'Attachments' },
        { title: 'Declarations' },
      ];
    
      
      const onChangeHandler = (event) => {
        if (event.target.name === 'languages') {
          let copy = { ...formData };
          if (event.target.checked) {
            copy.languages.push(event.target.value);
          } else {
            copy.languages = copy.languages.filter((el) => el !== event.target.value);
          }
          setFormData(copy);
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }));
        }
      };
    
      const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formData);
      };
    
      const nextStep = () => {
        setCurrentStep(currentStep + 1);
      };
    
      const prevStep = () => {
        setCurrentStep(currentStep - 1);
      };
    
    
  return (
    <div>
        <Stepper steps={steps} activeStep={currentStep} />
        <form onSubmit={onSubmitHandler}>
        {currentStep === 0 && (
          <>
           <div className="form-group">
              <div className="name-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  className="form-control"
                  name="firstName"
                  onChange={onChangeHandler}
                  value={formData.firstName}
                />
              </div>
              <div className="name-group">
                <label htmlFor="middleName" className="form-label">
                  Middle Name
                </label>
                <input
                  className="form-control"
                  name="middleName"
                  onChange={onChangeHandler}
                  value={formData.middleName}
                />
              </div>
              <div className="name-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  className="form-control"
                  name="lastName"
                  onChange={onChangeHandler}
                  value={formData.lastName}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                name="email"
                type="email"
                onChange={onChangeHandler}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                name="address"
                onChange={onChangeHandler}
                value={formData.address}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="permanentAddress" className="form-label">
                Permanent Address
              </label>
              <textarea
                className="form-control"
                name="permanentAddress"
                onChange={onChangeHandler}
                value={formData.permanentAddress}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                className="form-control"
                name="dob"
                type="date"
                onChange={onChangeHandler}
                value={formData.dob}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                className="form-control"
                name="mobile"
                type="tel"
                onChange={onChangeHandler}
                value={formData.mobile}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={onChangeHandler}
                    checked={formData.gender === 'male'}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={onChangeHandler}
                    checked={formData.gender === 'female'}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={onChangeHandler}
                    checked={formData.gender === 'other'}
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <button className="btn" type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}

{currentStep === 1 && (
  <>
    <div className="form-group">
      <label htmlFor="applicantInfo" className="form-label">
        Applicant Information:
      </label>
      <div className="name-group">
        <label htmlFor="applicantName" className="form-label">
          Applicant Name:
        </label>
        
        <input
          className="form-control"
          name="applicantName"
          onChange={onChangeHandler}
          value={formData.applicantName}
        />
         <label htmlFor="applicantName" className="form-label">
          Applicant Address:
        </label>
        <input
          className="form-control"
          name="applicantAddress"
          onChange={onChangeHandler}
          value={formData.applicantName}
        />
      </div>
      <div className="name-group">
        <label htmlFor="citizenshipInfo" className="form-label">
          Citizenship Information:
        </label>
        <input
          className="form-control"
          name="citizenshipInfo"
          onChange={onChangeHandler}
          value={formData.citizenshipInfo}
        />
      </div>
    </div>

    <div className="form-group">
      <label htmlFor="inventionInfo" className="form-label">
        Invention Information:
      </label>
      <div className="name-group">
        <label htmlFor="inventionTitle" className="form-label">
          Title of the Invention:
        </label>
        <input
          className="form-control"
          name="inventionTitle"
          onChange={onChangeHandler}
          value={formData.inventionTitle}
        />
      </div>
      <div className="name-group">
        <label htmlFor="abstract" className="form-label">
          Abstract:
        </label>
        <textarea
          className="form-control"
          name="abstract"
          onChange={onChangeHandler}
          value={formData.abstract}
        ></textarea>
      </div>
      <div className="name-group">
        <label htmlFor="detailedDescription" className="form-label">
          Detailed Description:
        </label>
        <textarea
          className="form-control"
          name="detailedDescription"
          onChange={onChangeHandler}
          value={formData.detailedDescription}
        ></textarea>
      </div>
      <div className="name-group">
        <label htmlFor="claims" className="form-label">
          Claims:
        </label>
        <textarea
          className="form-control"
          name="claims"
          onChange={onChangeHandler}
          value={formData.claims}
        ></textarea>
      </div>
    </div>


    <div className="form-group">
      <button className="btn" type="button" onClick={prevStep}>
        Previous
      </button>
      <button className="btn" type="button" onClick={nextStep}>
        Next
      </button>
    </div>
  </>
)}


{currentStep === 2 && (
  <>
    <div className="form-group">
      <label htmlFor="attachments" className="form-label">
        Attachments:  
      </label>
      <div className="name-group">
        <label htmlFor="projectReport" className="form-label">
          Project Report
        </label>
        <input
          type="file"
          className="form-control"
          name="projectReport"
          onChange={handleFileChange}
        />
      </div>
      <div className="name-group">
        <label htmlFor="paperRepresentation" className="form-label">
          Paper Representation
        </label>
        <input
          type="file"
          className="form-control"
          name="paperRepresentation"
          onChange={handleFileChange}
        />
      </div>
      <div className="name-group">
        <label htmlFor="workflowDiagrams" className="form-label">
          Workflow Diagrams
        </label>
        <input
          type="file"
          className="form-control"
          name="workflowDiagrams"
          onChange={handleFileChange}
        />
      </div>
      <div className="name-group">
        <label htmlFor="softwareCodeListings" className="form-label">
          Software Code Listings
        </label>
        <input
          type="file"
          className="form-control"
          name="softwareCodeListings"
          onChange={handleFileChange}
        />
      </div>
    </div>

    <div className="form-group">
      <button className="btn" type="button" onClick={prevStep}>
        Previous
      </button>
      <button className="btn" type="button" onClick={nextStep}>
        Next
      </button>
    </div>
  </>
)}
        
        {currentStep === 3 && (
          <>
            <div className="form-group">
              <label className="form-label">
                Declaration by the inventor(s)
              </label>
              <div>
                <input
                  type="checkbox"
                  id="declarationCheckbox"
                  name="declarationCheckbox"
                  checked={formData.declarationCheckbox}
                  onChange={() => handleCheckboxChange('declarationCheckbox')}
                />
                <label htmlFor="declarationCheckbox">
                  I/We, the above-named inventor(s), is/are the true & first
                  inventor(s) for this Invention and declare that the
                  applicant(s) herein is/are my/our assignee or legal
                  representative.
                </label>
              </div>
            </div>
            <div>
                <input
                  type="checkbox"
                  id="additionalDeclarationCheckbox"
                  name="additionalDeclarationCheckbox"
                  checked={formData.additionalDeclarationCheckbox}
                  onChange={() => handleCheckboxChange('additionalDeclarationCheckbox')}
                />
                <label htmlFor="additionalDeclarationCheckbox">
                  I/We, the applicant(s) in the convention country declare that
                  the applicant(s) herein is/are my/our assignee or legal
                  representative.
                </label>
              </div>

            <div className="form-group">
              <button className="btn" type="button" onClick={prevStep}>
                Previous
              </button>
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default Form