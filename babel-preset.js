module.exports = function () {
  return {
    plugins: [
      [
        require("babel-plugin-auto-import"),
        {
          declarations: [
            {
              default: "AAccordions",
              members: [
                "AAccordion",
                "AAccordionPanel",
                "AAccordionHeader",
                "AAccordionHeaderTitle",
                "AAccordionBody"
              ],
              path: "@cisco-ats/atomic-react/lib/components/AAccordion"
            },
            {
              default: "AAlert",
              path: "@cisco-ats/atomic-react/lib/components/AAlert"
            },
            {
              default: "AApp",
              path: "@cisco-ats/atomic-react/lib/components/AApp"
            },
            {
              default: "AAutocomplete",
              path: "@cisco-ats/atomic-react/lib/components/AAutocomplete"
            },
            {
              default: "ABadge",
              path: "@cisco-ats/atomic-react/lib/components/ABadge"
            },
            {
              default: "AButton",
              path: "@cisco-ats/atomic-react/lib/components/AButton"
            },
            {
              default: "AButtonGroup",
              path: "@cisco-ats/atomic-react/lib/components/AButtonGroup"
            },
            {
              default: "ACheckbox",
              path: "@cisco-ats/atomic-react/lib/components/ACheckbox"
            },
            {
              default: "ACombobox",
              path: "@cisco-ats/atomic-react/lib/components/ACombobox"
            },
            {
              default: "AContextualNotification",
              path:
                "@cisco-ats/atomic-react/lib/components/AContextualNotification"
            },
            {
              default: "ADialog",
              path: "@cisco-ats/atomic-react/lib/components/ADialog"
            },
            {
              default: "ADivider",
              path: "@cisco-ats/atomic-react/lib/components/ADivider"
            },
            {
              default: "ADropdowns",
              members: ["ADropdown", "ADropdownMenu", "ADropdownMenuItem"],
              path: "@cisco-ats/atomic-react/lib/components/ADropdown"
            },
            {
              default: "AFooters",
              members: ["AFooter", "AFooterLegal"],
              path: "@cisco-ats/atomic-react/lib/components/AFooter"
            },
            {
              default: "AHeaders",
              members: [
                "AHeader",
                "AHeaderLogo",
                "AHeaderTitle",
                "AHeaderNavigation"
              ],
              path: "@cisco-ats/atomic-react/lib/components/AHeader"
            },
            {
              default: "AIcon",
              path: "@cisco-ats/atomic-react/lib/components/AIcon"
            },
            {
              default: "AInputBase",
              path: "@cisco-ats/atomic-react/lib/components/AInputBase"
            },
            {
              default: "ALayout",
              members: ["AContainer", "ARow", "ACol", "ASpacer"],
              path: "@cisco-ats/atomic-react/lib/components/ALayout"
            },
            {
              default: "ALists",
              members: [
                "AList",
                "AListItem",
                "AListItemAvatar",
                "AListItemSubtitle",
                "AListItemTitle",
                "AListItemContent",
                "AListItemAction"
              ],
              path: "@cisco-ats/atomic-react/lib/components/AList"
            },
            {
              default: "ALoader",
              members: ["ACiscoLoader", "ADotLoader", "APageLoader"],
              path: "@cisco-ats/atomic-react/lib/components/ALoader"
            },
            {
              default: "AMenuBase",
              path: "@cisco-ats/atomic-react/lib/components/AMenuBase"
            },
            {
              default: "APanels",
              members: [
                "APanel",
                "APanelHeader",
                "APanelTitle",
                "APanelBody",
                "APanelFooter"
              ],
              path: "@cisco-ats/atomic-react/lib/components/APanel"
            },
            {
              default: "APopover",
              path: "@cisco-ats/atomic-react/lib/components/APopover"
            },
            {
              default: "ARadio",
              path: "@cisco-ats/atomic-react/lib/components/ARadio"
            },
            {
              default: "ASelect",
              path: "@cisco-ats/atomic-react/lib/components/ASelect"
            },
            {
              default: "ASimpleTable",
              path: "@cisco-ats/atomic-react/lib/components/ASimpleTable"
            },
            {
              default: "ASwitch",
              path: "@cisco-ats/atomic-react/lib/components/ASwitch"
            },
            {
              default: "ATabs",
              members: ["ATabGroup", "ATab", "ATabHeading"],
              path: "@cisco-ats/atomic-react/lib/components/ATabs"
            },
            {
              default: "ATag",
              path: "@cisco-ats/atomic-react/lib/components/ATag"
            },
            {
              default: "ATextarea",
              path: "@cisco-ats/atomic-react/lib/components/ATextarea"
            },
            {
              default: "ATextInput",
              path: "@cisco-ats/atomic-react/lib/components/ATextInput"
            },
            {
              default: "ATimelines",
              members: [
                "ATimeline",
                "ATimelineItem",
                "ATimelineItemBody",
                "ATimelineItemTitle"
              ],
              path: "@cisco-ats/atomic-react/lib/components/ATimeline"
            },
            {
              default: "AThemes",
              members: ["ATheme", "AThemeContext", "useATheme"],
              path: "@cisco-ats/atomic-react/lib/components/ATheme"
            },
            {
              default: "ATooltip",
              path: "@cisco-ats/atomic-react/lib/components/ATooltip"
            },
            {
              default: "ATree",
              path: "@cisco-ats/atomic-react/lib/components/ATree"
            }
          ]
        }
      ]
    ]
  };
};
