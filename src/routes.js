
// export const Routes = {
//     // pages
//     DashboardOverview: { path: "/dashboard/overview" },
//     Transactions: { path: "/transactions" },
//     Settings: { path: "/settings" },
//     Upgrade: { path: "/upgrade" },
//     BootstrapTables: { path: "/tables/bootstrap-tables" },
//     Carousel: {path: "/projects/createProjects"},
//     Motivation: {path: "/projects/:id"},
//     Service: {path: "/projects/editprojects"},
//     Banner: {path: "/tasks/createTasks"},
//     Aboutus: {path: "/tasks/viewTasks"},
//     Testimonial: {path: "/about/testimonial"},
//     Services: {path: "/services/services"},
//     Contact: {path: "/contact/contact"},
//     Uploadblog: {path: "/blog/uploadblog"},
//     Billing: { path: "/examples/billing" },
//     Invoice: { path: "/examples/invoice" },
//     Signin: { path: "/sign-in" },
//     Signup: { path: "/examples/sign-up" },
//     ForgotPassword: { path: "/examples/forgot-password" },
//     ResetPassword: { path: "/examples/reset-password" },
//     Lock: { path: "/examples/lock" },
//     NotFound: { path: "/examples/404" },
//     ServerError: { path: "/examples/500" },

import createConsolidated from "./pages/Billing/createConsolidated";
import CreateFormat from "./pages/format/createformat";

//     // docs
//     DocsOverview: { path: "/documentation/overview" },
//     DocsDownload: { path: "/documentation/download" },
//     DocsQuickStart: { path: "/documentation/quick-start" },
//     DocsLicense: { path: "/documentation/license" },
//     DocsFolderStructure: { path: "/documentation/folder-structure" },
//     DocsBuild: { path: "/documentation/build-tools" },
//     DocsChangelog: { path: "/documentation/changelog" },

//     // components
//     Accordions: { path: "/components/accordions" },
//     Alerts: { path: "/components/alerts" },
//     Badges: { path: "/components/badges" },
//     Widgets: { path: "/widgets" },
//     Breadcrumbs: { path: "/components/breadcrumbs" },
//     Buttons: { path: "/components/buttons" },
//     Forms: { path: "/components/forms" },
//     Modals: { path: "/components/modals" },
//     Navs: { path: "/components/navs" },
//     Navbars: { path: "/components/navbars" },
//     Pagination: { path: "/components/pagination" },
//     Popovers: { path: "/components/popovers" },
//     Progress: { path: "/components/progress" },
//     Tables: { path: "/components/tables" },
//     Tabs: { path: "/components/tabs" },
//     Tooltips: { path: "/components/tooltips" },
//     Toasts: { path: "/components/toasts" },
//     WidgetsComponent: { path: "/components/widgets" }
// };



export const Routes = {
    // pages
    DashboardOverview: { path: "/dashboard/overview" },
    Transactions: { path: "/transactions" },
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    // Projects
    CreateProjects: {path: "/projects/createProjects"},
    ViewProjects: {path: "/projects/:id"},
    Client: {path: "/projectss/:id"},
    Service: {path: "/projects/editprojects"},
    Question:{path:"/projects/question"},

    // Tasks
    CreateTasks: {path: "/tasks/createTasks"},
    ViewTasks: {path: "/tasks/viewTasks"},

    // Buckets
    CreateBucket: {path: "/buckets/createBucket"},
    ViewBucket: {path: "/buckets/viewBucket"},

  
    // Aboutus
    Testimonial: {path: "/about/testimonial"},
    Services: {path: "/services/services"},
    Contact: {path: "/contact/contact"},
    ViewContacts:{path:"/contacts"},
    Uploadblog: {path: "/blog/uploadblog"},
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signin: { path: "/sign-in" },
    Signup: { path: "/sign-up" },
    ForgotPassword: { path: "/examples/forgot-password" },
    ResetPassword: { path: "/examples/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },

    // docs
    DocsOverview: { path: "/documentation/overview" },
    DocsDownload: { path: "/documentation/download" },
    DocsQuickStart: { path: "/documentation/quick-start" },
    DocsLicense: { path: "/documentation/license" },
    DocsFolderStructure: { path: "/documentation/folder-structure" },
    DocsBuild: { path: "/documentation/build-tools" },
    DocsChangelog: { path: "/documentation/changelog" },

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" },

    // Added Later
    // Correspondence
    CreateNode:{path:"/correspondence/create"},
    ViewNode:{path:"/correspondence/view"},

    // ViewLetter:{path:"/correspondence/view"},

    // Tools
    


    // Finance
    CreateInvoice:{path:'/billing/createinvoice'},
    CreateCredit:{path:'/billing/createBill'},
    viewBills:{path:'/billing/viewBills'},
    createConsolidated:{path:"/billing/createConsolidated"},
    
    // Credit

    // Format
    CreateTemplate:{path:"/feasibility/createTemplate"},
    CreateFormat:{path:'/format/create'},
    ViewTemplate:{path:"/feasibility/viewTemplate"},
    EditTemplate:{path:"/feasibility/:id"},
    EditFormat:{path:"/format/:id"},
    AddWatermark:{path:"/tools/addWatermark"},
    AddWatermarks:{path:"/tools/addWatermarks"},

    Questions:{path:'/format/questions'},

    // Routes
    viewRoutes:{path:'/routes/viewRoutes'}
    


    
};