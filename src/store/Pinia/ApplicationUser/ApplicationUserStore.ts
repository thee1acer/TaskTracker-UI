import { defineStore } from "pinia";
import { ApplicationUserDTO } from "../../../models/ApplicationUserDTO";
import ApplicationUserService from "../../../services/ApplicationUser/ApplicationUserService";

interface ApplicationUserState {
  _activeApplicationUser?: ApplicationUserDTO;
  _allApplicationUsers?: ApplicationUserDTO[];
  _isAuthenticated?: boolean;
  _isTokenExpired?: boolean;
}

export const useApplicationUserStore = defineStore("Application User Store", {
  state: (): ApplicationUserState => ({
    _activeApplicationUser: undefined,
    _allApplicationUsers: undefined,
    _isAuthenticated: undefined,
    _isTokenExpired: undefined
  }),
  getters: {
    activeApplicationUser: ({ _activeApplicationUser }) => {
      return _activeApplicationUser;
    },
    allApplicationUser: ({ _allApplicationUsers }) => {
      return _allApplicationUsers;
    }
  },
  actions: {
    setActivelApplicationUser(appUser: ApplicationUserDTO) {
      console.log({ appUser: appUser });

      this._activeApplicationUser = appUser;

      console.log({ setActiveUserTO: this._activeApplicationUser });
    },
    getAllApplicationUsers() {
      ApplicationUserService.getAllUsers().then(
        (users) => (this._allApplicationUsers = users)
      );
    },
    deleteApplicationUser(applicationUserId: number) {
      ApplicationUserService.deleteUserAsync(applicationUserId).then((res) =>
        console.log({ user_deletion: res })
      );
    },
    addApplicationUser(applicationUser: ApplicationUserDTO) {
      ApplicationUserService.addUserAsync(applicationUser).then((res) =>
        console.log({ user_addition: res })
      );
    },
    updateApplicationUser(applicationUser: ApplicationUserDTO) {
      ApplicationUserService.updateUserAsync(applicationUser).then((res) =>
        console.log({ user_update: res })
      );
    },
    logout() {
      this._activeApplicationUser = undefined;
    }
  },
  persist: {
    enabled: true
  }
});
