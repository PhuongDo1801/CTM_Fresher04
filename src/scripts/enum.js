const MISAEnum = {
  FormMode: {
    Add: 1,
    Update: 2,
  },

  Gender: {
    male: 0,
    female: 1,
    other: 2,
  },
  ResponseCode: {
    success: 200,
    created: 201,
    error: 500,
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
    question:"QUESTION"
  },
};

export default MISAEnum;
