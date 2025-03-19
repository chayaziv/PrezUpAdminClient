export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

// export interface UserActivity {
//   userId: number;
//   userName: string;
//   presentationCount: number;
// }

export interface RoleDistribution {
  roleName: string;
  userCount: number;
}

export interface PresentationStatistics {
  totalPresentations: number;
  publicPresentations: number;
}
export interface UserDto {
  userId: number;
  userName: string;
  presentationCount: number;
}
// export interface TopUser {
//   userId: number;
//   userName: string;
//   presentationsCount: number;
// }

export interface MonthlyPresentations {
  month: number;
  year: number;
  presentationCount: number;
}

// export interface UnusualActivity {
//   userId: number;
//   userName: string;
//   presentationsCount: number;
// }

export interface AdminDashboard {
  userStatistics: UserStatistics;
  userActivities: UserDto[];
  rolesDistribution: RoleDistribution[];
  presentationStatistics: PresentationStatistics;
  topUsers: UserDto[];
  monthlyPresentations: MonthlyPresentations[];
  unusualActivities: UserDto[];
}

export const initialDashboard: AdminDashboard = {
  userStatistics: {
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  },
  userActivities: [],
  rolesDistribution: [],
  presentationStatistics: {
    totalPresentations: 0,
    publicPresentations: 0,
  },
  topUsers: [],
  monthlyPresentations: [],
  unusualActivities: [],
};
