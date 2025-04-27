
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";

interface ClaimsFormValues {
  [key: string]: any;
}

interface ClaimsFormProps {
  setActiveComponent: (component: string) => void;
}

const ClaimsForm: React.FC<ClaimsFormProps> = ({ setActiveComponent }) => {
  const router = useRouter();
  const [selectedTeeth, setSelectedTeeth] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xrayFiles, setXrayFiles] = useState<File[]>([]);

  const currentDate = new Date().toLocaleDateString('en-GB');

  const handleToothClick = (toothNumber: string) => {
    if (selectedTeeth.includes(toothNumber)) {
      setSelectedTeeth(selectedTeeth.filter((tooth) => tooth !== toothNumber)); // Remove tooth
    } else {
      setSelectedTeeth([...selectedTeeth, toothNumber]); // Add tooth
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveComponent("welcome");
  };

  const validationSchema = Yup.object({
    patientName: Yup.string().required("Required"),
    patientDOB: Yup.date().required("Required"),
    patientMobile: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(9, "Must be at least 9 digits")
      .required("Required"),
    planType: Yup.string().required("Required"),
    membershipNo: Yup.string().required("Required"),
    policyNumber: Yup.string().required("Required"),
    doctorName: Yup.string().required("Required"),
    clinicName: Yup.string().required("Required"),
    clinicAddress: Yup.string().required("Required"),
    clinicPhone: Yup.string().required("Required").matches(/^[0-9]+$/, "Must be only digits"),
    examDate: Yup.date().required("Required"),
    chiefComplaint: Yup.string().required("Required"),
    diagnosis: Yup.string().required("Required"),
    procedureDescription: Yup.string().required("Description is required"),
    opdFile: Yup.mixed().test(
      "fileFormat",
      "Unsupported Format",
      (value: any) => value && ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
    ).required("Required"),
    fullFace: Yup.mixed().required("Required"),
    frontal: Yup.mixed().required("Required"),
    upperOcclusal: Yup.mixed().required("Required"),
    lowerOcclusal: Yup.mixed().required("Required"),
    problemArea: Yup.mixed().required("Required"),
    xrayUpload: Yup.array().of(Yup.mixed().required("Required")).min(1, "At least one X-ray is required"),
    others: Yup.mixed().test(
      "fileFormat",
      "Unsupported Format",

      (value: any) => !value || ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
    ),
  });

  const handleSubmit = (values: ClaimsFormValues) => {
    console.log("Form submitted successfully!", values);
    setIsModalOpen(true);
  };

  const handleXrayUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    const files = Array.from(e.target.files || []);
    setXrayFiles((prevFiles) => [...prevFiles, ...files.map(file => file)]);
    setFieldValue("xrayUpload", [...xrayFiles, ...files], true);
  };

  const handleOPDFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    const file = e.target.files?.[0];
    setFieldValue("opdFile", file, true);
  };

  const handleSingleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    const file = e.target.files?.[0];
    setFieldValue(fieldName, file, true);
  };

  return (
    <>
      <Formik
        initialValues={{

          patientName: "",
          patientDOB: "",
          patientMobile: "",
          planType: "",
          membershipNo: "",
          policyNumber: "",
          doctorName: "",
          clinicName: "",
          clinicAddress: "",
          clinicPhone: "",
          examDate: "",
          chiefComplaint: "",
          diagnosis: "",
          procedureDescription: "",
          opdFile: null,
          fullFace: null,
          frontal: null,
          upperOcclusal: null,
          lowerOcclusal: null,
          problemArea: null,
          xrayUpload: [],
          others: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form className="space-y-6">
            {/* Patient Information */}
            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Patient Information</h2>
                <div>
                  <Label htmlFor="patientName" className="block mb-1">
                    Name
                  </Label>
                  <Field
                    as={Input}
                    type="text"
                    id="patientName"
                    name="patientName"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="patientName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-4">

                  <Label htmlFor="patientDOB" className="block mb-1">
                    DOB (dd/mm/yyyy)
                  </Label>
                  <Field
                    as={Input}
                    type="date"
                    id="patientDOB"
                    name="patientDOB"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="patientDOB"
                    component="div"
                    className="text-red-500 text-sm"
                  />



                  <div>
                    <Label htmlFor="patientMobile" className="block mb-1">
                      Mobile Number
                    </Label>
                    <Field
                      as={Input}
                      type="tel"
                      id="patientMobile"
                      name="patientMobile"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="patientMobile"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div></div>

                <div>

                  <Label htmlFor="planType" className="block mb-1">
                    Plan Type
                  </Label>
                  <Field
                    as={Input}
                    type="text"
                    id="planType"
                    name="planType"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="planType"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>

                  <Label htmlFor="membershipNo" className="block mb-1">
                    Membership No.
                  </Label>
                  <Field
                    as={Input}
                    type="text"
                    id="membershipNo"
                    name="membershipNo"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="membershipNo"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>

                  <Label htmlFor="policyNumber" className="block mb-1">
                    Policy Number
                  </Label>
                  <Field
                    as={Input}
                    type="text"
                    id="policyNumber"
                    name="policyNumber"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="policyNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </section>
          

          {/* Doctor Information */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Doctor Information</h2>
              <div>
                <Label htmlFor="doctorName" className="block mb-1">
                  Doctor Name
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  className="w-full"
                />
                <ErrorMessage
                  name="doctorName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-4">
                <Label htmlFor="clinicName" className="block mb-1">
                  Clinic Name
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="clinicName"
                  name="clinicName"
                  className="w-full"
                />
                <ErrorMessage
                  name="clinicName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="clinicAddress" className="block mb-1">
                  Clinic Address
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="clinicAddress"
                  name="clinicAddress"
                  className="w-full"
                />
                <ErrorMessage
                  name="clinicAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>

                <Label htmlFor="clinicPhone" className="block mb-1">Clinic Phone Number</Label>
                <Field as={Input} type="tel" name="clinicPhone" id="clinicPhone" className="w-full" />
                <ErrorMessage name="clinicPhone" component="div" className="text-red-500 text-sm" />
              </div>
            </section>
            <div>
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Procedure Information</h2>
                <div className="md:grid md:grid-cols-2 md:gap-4">
                  <Label htmlFor="examDate" className="block mb-1">
                    Date of Examination
                  </Label>
                  <Field
                    as={Input}
                    type="date"
                    id="examDate"
                    name="examDate"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="examDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="chiefComplaint" className="block mb-1">
                    Chief Complaint & Main Symptoms
                  </Label>
                  <Field
                    as="textarea"
                    id="chiefComplaint"
                    name="chiefComplaint"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage name="chiefComplaint" component="div" className="text-red-500 text-sm" />
                </div>
            </div>

            <div>
              <Label htmlFor="diagnosis" className="block mb-1">
                Diagnosis
              </Label>
              <Field
                as="textarea"
                id="diagnosis"
                name="diagnosis"
                className="w-full border border-gray-300 rounded p-2"
              />
              <ErrorMessage name="diagnosis" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Label htmlFor="procedureDescription" className="block mb-1">
                Description of Procedure (Clinical Notes) *
              </Label>
              <Field
                as="textarea"
                id="procedureDescription"
                name="procedureDescription"
                className="w-full border border-gray-300 rounded p-2"
              />


              <ErrorMessage name="procedureDescription" component="div" className="text-red-500 text-sm" />
              <Label className="block mb-1">Tooth Number:</Label>
              {/* Placeholder for Tooth Chart - Replace with actual chart */}
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 32 }, (_, i) => i + 1).map((tooth) => (
                  <button
                    key={tooth}
                    type="button"
                    className={`border border-gray-300 rounded p-2 ${selectedTeeth.includes(tooth.toString()) ? "bg-blue-200" : ""}`}
                    onClick={() => handleToothClick(tooth.toString())}
                  >
                    {tooth}
                  </button>
                ))}
              </div>
              {selectedTeeth.length > 0 && <p className="mt-2">Selected Teeth: {selectedTeeth.join(", ")}</p>}
            </div>
          </section>
        

          {/* Uploads Section */}
            < section className = "space-y-4" >
              <h2 className="text-lg font-semibold">Uploads</h2>

              {/* OPD File */}
              <div>
                <Label htmlFor="opdFile" className="block mb-1">OPD File (PDF/JPG/PNG)</Label>
                <Input
                  type="file"
                  id="opdFile"
                  name="opdFile"
                  accept="application/pdf, image/jpeg, image/png"
                  className="w-full"
                  onChange={(e) => handleOPDFileChange(e, setFieldValue)}
                />
                <ErrorMessage name="opdFile" component="div" className="text-red-500 text-sm" />
                {touched.opdFile && errors.opdFile && <div className="text-red-500">{errors.opdFile}</div>}
              </div>

              {/* Full Face */}
              <div>
                <Label htmlFor="fullFace" className="block mb-1">Full Face</Label>
                <Input
                  type="file"
                  id="fullFace"
                  name="fullFace"
                  accept="image/jpeg, image/png"
                  className="w-full"
                  onChange={(e) => handleSingleFileUpload(e, "fullFace", setFieldValue)}
                />
                <ErrorMessage name="fullFace" component="div" className="text-red-500 text-sm" />
                {touched.fullFace && errors.fullFace && <div className="text-red-500">{errors.fullFace}</div>}
              </div>

              {/* Frontal */}
              <div>
                <Label htmlFor="frontal" className="block mb-1">Frontal</Label>
                <Input
                  type="file"
                  id="frontal"
                  name="frontal"
                  accept="image/jpeg, image/png"
                  className="w-full"
                  onChange={(e) => handleSingleFileUpload(e, "frontal", setFieldValue)}
                />
                <ErrorMessage name="frontal" component="div" className="text-red-500 text-sm" />
                {touched.frontal && errors.frontal && <div className="text-red-500">{errors.frontal}</div>}
              </div>

              {/* Upper Occlusal */}
              <div>
                <Label htmlFor="upperOcclusal" className="block mb-1">Upper Occlusal</Label>
                <Input
                  type="file"
                  id="upperOcclusal"
                  name="upperOcclusal"
                  accept="image/jpeg, image/png"
                  className="w-full"
                  onChange={(e) => handleSingleFileUpload(e, "upperOcclusal", setFieldValue)}
                />
                <ErrorMessage name="upperOcclusal" component="div" className="text-red-500 text-sm" />
                {touched.upperOcclusal && errors.upperOcclusal && <div className="text-red-500">{errors.upperOcclusal}</div>}
              </div>

              {/* Lower Occlusal */}
              <div>
                <Label htmlFor="lowerOcclusal" className="block mb-1">Lower Occlusal</Label>
                <Input
                  type="file"
                  id="lowerOcclusal"
                  name="lowerOcclusal"
                  accept="image/jpeg, image/png"
                  className="w-full"
                  onChange={(e) => handleSingleFileUpload(e, "lowerOcclusal", setFieldValue)}
                />
                <ErrorMessage name="lowerOcclusal" component="div" className="text-red-500 text-sm" />
                {touched.lowerOcclusal && errors.lowerOcclusal && <div className="text-red-500">{errors.lowerOcclusal}</div>}
              </div>

              {/* Problem Area (post-treatment) */}
              <div>
                <Label htmlFor="problemArea" className="block mb-1">Problem Area (post-treatment)</Label>
                <Input
                  type="file"
                  id="problemArea"
                  name="problemArea"
                  accept="image/jpeg, image/png"
                  className="w-full"
                  onChange={(e) => handleSingleFileUpload(e, "problemArea", setFieldValue)}
                />
                <ErrorMessage name="problemArea" component="div" className="text-red-500 text-sm" />
                {touched.problemArea && errors.problemArea && <div className="text-red-500">{errors.problemArea}</div>}
              </div>

              {/* X-ray Upload */}
              <div>
                <Label htmlFor="xrayUpload" className="block mb-1">X-ray Upload</Label>
                <Input
                  type="file"
                  id="xrayUpload"
                  name="xrayUpload"
                  accept="image/jpeg, image/png"
                  multiple
                  className="w-full"
                  onChange={(e) => handleXrayUpload(e, setFieldValue)}
                />
                <ErrorMessage name="xrayUpload" component="div" className="text-red-500 text-sm" />
                {touched.xrayUpload && errors.xrayUpload && <div className="text-red-500">{errors.xrayUpload}</div>}

                {/* Display selected X-ray files */}
                {xrayFiles.length > 0 && (
                  <div className="mt-2">
                    <p>Selected X-ray Files:</p>
                    <ul>
                      {xrayFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Others */}
              <div>
                <Label htmlFor="others" className="block mb-1">Others (PDF/JPG/PNG)</Label>
                <Input
                  type="file"
                  id="others"
                  name="others"
                  accept="application/pdf, image/jpeg, image/png"
                  className="w-full"
                  onChange={(e) => handleSingleFileUpload(e, "others", setFieldValue)}
                />
                <ErrorMessage name="others" component="div" className="text-red-500 text-sm" />
                {touched.others && errors.others && <div className="text-red-500">{errors.others}</div>}
              </div>
            </section >

            <div className="flex items-center space-x-2">
              <Field
                as={Checkbox}
                id="terms"
                name="terms"
                className="rounded-sm border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                By submitting this form electronically, I confirm that all information provided is accurate and complete to the best of my knowledge. I acknowledge that any false or misleading information may result in denial of the claim and potential further action. I also consent to the use of electronic communication for updates and correspondence regarding this claim
              </Label>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Date: {currentDate}
              </div>
            </div>

            <Button type="submit" className="bg-primary">
              Submit
            </Button>
          </Form>
        )}

      </Formik>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Claim Submitted</DialogTitle>
            <DialogDescription>
              Your claim has been submitted successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClaimsForm;
