# Atomic components for React

## Background

The Cisco Security Business Group (SBG) has adopted [Atomic/Hammurabi](http://ux-document-lnx/~designer/sbg-ux/1.7.0/components/atoms/getting-started.html) as a design standard. The majority of the SBG front-ends are written using the React library and are configured based on their use case. For a variety of reasons, the existing UI toolkit is unable to support the various use cases necessary for adoption. In addition, a React-specific library offers greater usability and maintainablility over a styles-only solution.

## Project Goal

The aim is to provide an Atomic Design component library for React developers that enables them to import only the components that are necessary for their application/library. The library should be fully documented and reduce barriers to adoption as much as possible. In addition, the library should fully support the available design standards.

## The Plan For Now

Using the Atomic UI Toolkit (v1.8.0) as a base, and leveraging the work done in [threatgrid/atomic-ui-components], create a base set of components while addressing common developer issues such as CSS specificity and library size (in KB). Get documentation set up, published. Get a package into artifactory (or public if possible).
