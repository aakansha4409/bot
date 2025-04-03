import response from "../../config/response";
import Controller from "./type";

// --------------------------------------------------------------
// Define user controller
// --------------------------------------------------------------

const controller: Controller = {

  // -------------------------------------------------------
  // Get a user and return the user data
  // -------------------------------------------------------

  get: async (req, res) => {
    try {
        const { userId, firstName, username,invitationLink } = req.query;
  
        const data = {
          userId: userId || "Unknown",
          firstName: firstName || "Unknown",
          username: username || "No username",
          invitationLink:invitationLink|| "No invitation link",
        };

        const message = "User data fetched successfully";
        return response.success(res, data, message);

      } catch (error) {
      return response.errors(res, (error as Error).message, 500);
    }
  },
};

// ------------------------------
// Export user controller
// ------------------------------
export default controller;
