# Page Directory

This document lists all the pages in the application, their visibility, and whether they are included in the main navigation menu.

## Page List

| Path                          | In Menu | Status  | Component                                                  |
| ----------------------------- | ------- | ------- | ---------------------------------------------------------- |
| `/home`                       | Yes     | Visible | `MainPage`                                                 |
| `/info-for-vendors`           | Yes     | Visible | `ForVendorsPage`                                           |
| `/statutes`                   | Yes     | Visible | `StatutesPage`                                             |
| `/hall`                       | Yes     | Visible | `HallMapPage`                                              |
| `/vendor/statute`             | No      | Hidden  | `VendorStatutePage`                                        |
| `/admin`                      | No      | Hidden  | `AdminLayout` (redirects to `/admin/vendors/applications`) |
| `/admin/editor`               | No      | Hidden  | `EditorPage`                                               |
| `/admin/vendor-form`          | No      | Hidden  | `VendorFormPage`                                           |
| `/admin/vendors/applications` | No      | Hidden  | `VendorsApplicationsPage`                                  |

Legacy paths `/editor`, `/vendor-form` and `/info-for-vendors-statue` still exist and redirect to `/admin/editor`, `/admin/vendor-form` and `/vendor/statute` respectively (kept for old bookmarks/links).

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
