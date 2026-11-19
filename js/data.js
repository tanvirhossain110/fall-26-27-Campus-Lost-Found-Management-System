let users = [
  { id: "U-001", name: "Jamila",   username: "admin",   password: "admin1234", email: "admin@campus.edu",   phone: "01711000001", role: "Admin",   status: "Active" },
  { id: "U-002", name: "Tanvir Hossain",   username: "officer", password: "officer123", email: "tanvir@campus.edu",   phone: "01711000002", role: "Officer", status: "Active",
    staffId: "STF-1001", officeLocation: "Main Gate Office", shift: "Morning" },
  { id: "U-003", name: "Md. Muhtasim Sami",   username: "student", password: "student123", email: "24-56464-1@student.aiub.edu",  phone: "01711000003", role: "Student", status: "Active",
    studentId: "23-51234-1", department: "CSE", semester: "9th" },
  { id: "U-004", name: "Wahidul Alam",   username: "faculty", password: "faculty123", email: "wahid.riyad@aiub.edu",   phone: "01711000004", role: "Faculty", status: "Active",
    employeeId: "EMP-1001", designation: "Lecturer", experience: 4, preferredContact: "Email" },
  { id: "U-010", name: "Emrul Hasan",   username: "jamal",   password: "jamal1234",  email: "jamal@campus.edu",   phone: "01711000010", role: "Officer", status: "Pending",
    staffId: "STF-1003", officeLocation: "Library Front Desk", shift: "Morning" }
];


let lostItems = [
  { id: "L-001", reporterId: "U-003", reporterName: "Muhtasim Sami",
    itemName: "Black backpack", category: "Bags",
    location: "Library 5th floor", dateLost: "2026-11-01",
    description: "Black Nike backpack with a laptop inside.", status: "Open" }
];


let foundItems = [
  { id: "F-001", finderId: "U-004", finderName: "Wahidul Alam",
    itemName: "Black bag", category: "Bags",
    location: "Cafeteria Annex 1", dateFound: "2026-11-02",
    description: "Black bag with a laptop charger inside.",
    handedToOfficer: true, status: "Available" }
];


let claimRequests = [
  { id: "C-001", claimantId: "U-004", claimantName: "Wahidul Alam",
    foundId: "F-001", foundName: "Black bag",
    proof: "It has my initials KH on the inner pocket.",
    contact: "01711000004", collectWhere: "Lost & Found Office",
    status: "Pending", date: "2026-11-03" }
];
