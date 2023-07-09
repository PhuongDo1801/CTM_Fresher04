const MISAEnum = {
  FormMode: {
    Add: 1,
    Update: 2,
    Replicate:3
  },

  Gender: {
    male: 0,
    female: 1,
    other: 2,
  },
  ResponseCode: {
    success: 200,
    created: 201,
    notFound:404,
    badRequest:400,
    error: 500,
    conflict:409
  },

  ApiType: {
    created: "created",
    updated: "updated",
    deleted: "deleted",
  },

  DialogType: {
    create: "CREATE",
    delete: "DELETE",
    duplicate: "DUPLICATE",
    badRequest:"BADREQUEST",
    question:"QUESTION",
    deleteMultiple:"DELETEMULTIPLE",
    notFound:"NOTFOUND",
    serverError:"SERVERERROR",
    conflict:"CONFLICT"
  },

  ErrorField:{
    employeeCode:"EmployeeCode",
    fullName:"FullName",
    departmentId:"DepartmentId",
    dateOfBirth:"DateOfBirth",
    dateRange:"DateRange",
    email:"Email"
  },
};

export default MISAEnum;
