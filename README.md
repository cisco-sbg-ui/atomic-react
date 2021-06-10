# Atomic-React

## Introduction

Atomic-React is a React library that implements UI components according to the [Atomic design specification](http://ux-document-lnx/~designer/sbg-ux/components/atoms/getting-started.html) (requires VPN). Developers can enjoy the following features:

- Flexible, tree-shakable components
- Full [documentation](https://atomic-react.vercel.app/)
- [Auto-import](https://atomic-react.vercel.app/)
- Baked-in accessibility
- Responsive helpers
- CSS helpers
- Form validation
- Extensibility

## Questions

Consult [the documentation](https://atomic-react.vercel.app). For additional help and support, please reach out to Anton Frattaroli on Webex Teams, or file an issue in this repository.

## Contributing

### Design Development

See the [Atomic contribution page](http://ux-document-lnx/~designer/sbg-ux/components/atoms/contribution.html).

### Component Development

#### Getting Access

Contact Maribell Buchanan via Webex Teams to request write access for your group to https://github.com/threatgrid/atomic-react

#### Toolset

- The components themselves are standard functional components with sass styles.
- The documentation is a Gatsby site, which Cypress runs against for testing including screenshot diff testing.
- The Prettier/ESLint/Editorconfig settings are expected to be respected.
- Pull requests run tests on Travis that subsequently send coverage data to codecov.io, which will run checks assuring coverage is achieved. Pull requests require a code review.

#### Contact

Feel free to reach out to Anton Frattaroli via Webex Teams to discuss contributions.
