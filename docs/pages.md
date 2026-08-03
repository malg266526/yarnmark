# Page Directory

This document lists all the pages in the application, their visibility, and whether they are included in the main navigation menu.

## Page List

| Path                       | In Menu | Status  | Component                 |
| -------------------------- | ------- | ------- | ------------------------- |
| `/home`                    | Yes     | Visible | `MainPage`                |
| `/info-for-vendors`        | Yes     | Visible | `ForVendorsPage`          |
| `/statutes`                | Yes     | Visible | `StatutesPage`            |
| `/hall`                    | Yes     | Visible | `HallMapPage`             |
| `/info-for-vendors-statue` | No      | Hidden  | `VendorStatutePage`       |
| `/admin`                   | No      | Hidden  | `AdminLayout` (redirects to `/admin/applications`) |
| `/admin/editor`            | No      | Hidden  | `EditorPage`              |
| `/admin/vendor-form`       | No      | Hidden  | `VendorFormPage`          |
| `/admin/applications`      | No      | Hidden  | `VendorsApplicationsPage` |

Legacy paths `/editor` and `/vendor-form` still exist and redirect to `/admin/editor` and `/admin/vendor-form` respectively (kept for old bookmarks/links).

## Menu Links

The main navigation menu also includes links to specific sections on the `/home` page:

- `#mainInfoButtons`
- `#workshops`
- `#vendors`
- `#after`
- `#patterns`
- `#lagrugru`
- `#team-and-partners`
- `#lastEdition`
- `#food`
- `#footer`
