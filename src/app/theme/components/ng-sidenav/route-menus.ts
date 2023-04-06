export const defaults = [
  { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard', exact: true, }
];

export const partner = [
  { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard', exact: true, },
  { routeLink: 'talents/add', icon: 'fal fa-box-open', label: 'Talents', exact: true, },
  { routeLink: 'contracts', icon: 'fal fa-chart-bar', label: 'Contracts', exact: true, },
  { routeLink: 'hiring', icon: 'fal fa-tags', label: 'Hiring', exact: false, },
  { routeLink: 'invoice', icon: 'fal fa-file-invoice-dollar', label: 'Invoice', exact: true, },
  { routeLink: 'notifications', icon: 'fal fa-bell', label: 'Notification', exact: true, },
];

export const owner = [
  { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard', exact: true },
  { routeLink: 'timesheet', icon: 'fal fa-chart-bar', label: 'Timesheets', exact: true },
  { routeLink: 'jobs', icon: 'fal fa-tags', label: 'Hot Jobs', exact: true },
  { routeLink: 'learn', icon: 'fal fa-book-open', label: 'Learn & Grow', exact: true },
  { routeLink: 'profile', icon: 'fal fa-file', label: 'Career Profile', exact: true },
  { routeLink: 'notifications', icon: 'fal fa-bell', label: 'Notification', exact: true }
];

export const superadmin = [
  { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard', exact: true },
  { routeLink: 'jobs', icon: 'fal fa-briefcase', label: 'Jobs', exact: true },
  { routeLink: 'contracts', icon: 'fal fa-file-archive', label: 'Contract & Legal', exact: true },
  { routeLink: 'hiring', icon: 'fal fa-tag', label: 'Hiring', exact: true },
  { routeLink: 'invoice', icon: 'fal fa-file-invoice-dollar', label: 'Invoice', exact: true },
  { routeLink: 'seekers', icon: 'fal fa-users', label: 'Clients', exact: true },
  { routeLink: 'partners-admin', icon: 'fal fa-users', label: 'Partners', exact: true },
  // { routeLink: 'projects', icon: 'fal fa-window-restore', label: 'Projects', exact: true },
  /* { routeLink: 'superadmin/addnew-ss', icon: 'fal fa-user-plus', label: 'Add Client', exact: true, query: { type: 'Basic' } },
  { routeLink: 'superadmin/addnew-ss', icon: 'fal fa-cubes', label: 'Add Project', exact: true, query: { type: 'Project' } },
  { routeLink: 'superadmin/addnew-ss', icon: 'fal fa-tags', label: 'Add Job', exact: true, query: { type: 'Requirement' } }, */
  { routeLink: 'notifications', icon: 'fal fa-bell', label: 'Notification', exact: true }
];

export const skillseeker = [
  { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard', exact: true },
  { routeLink: 'jobs', icon: 'fal fa-box-open', label: 'Jobs', exact: true },
  { routeLink: 'contracts', icon: 'fal fa-chart-bar', label: 'Contracts', exact: true },
  { routeLink: 'hiring', icon: 'fal fa-tags', label: 'Hiring', exact: true },
  { routeLink: 'invoice', icon: 'fal fa-file-invoice-dollar', label: 'Invoice', exact: true },
  { routeLink: 'notifications', icon: 'fal fa-bell', label: 'Notification', exact: true },
  { routeLink: 'employees-role', icon: 'fal fa-solid fa-users', label: 'Employees', exact: true }
];
