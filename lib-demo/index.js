import React, {useRef} from "react";
import ReactDOM from "react-dom";

const ThemedComponent = ({children}) => {
  const {currentTheme} = useATheme();

  return (
    <div>
      Current theme is {currentTheme}
      {children}
    </div>
  );
};

const App = () => {
  const buttonRef = useRef(null);
  return (
    <AApp>
      <AAccordion>
        <AAccordionPanel>
          <AAccordionHeader />
          <AAccordionHeaderTitle />
          <AAccordionBody />
        </AAccordionPanel>
      </AAccordion>
      <AAlert />
      <AAutocomplete />
      <ABadge />
      <AButton ref={buttonRef} />
      <AButtonGroup />
      <ACheckbox />
      <ACombobox />
      <AContextualNotification />
      <AContextualNotificationMenu anchorRef={buttonRef} />
      <ADialog />
      <ADivider />
      <ADropdown />
      <ADropdownMenu />
      <ADropdownMenuItem />
      <AFooter />
      <AFooterLegal />
      <AForm />
      <AHeader />
      <AHeaderLogo />
      <AHeaderTitle />
      <AHeaderNavigation />
      <AHint />
      <AIcon>warning</AIcon>
      <AInputBase />
      <AContainer />
      <ARow />
      <ACol />
      <ASpacer />
      <AList />
      <AListItem />
      <AListItemAvatar />
      <AListItemSubtitle />
      <AListItemTitle />
      <AListItemContent />
      <AListItemAction />
      <ACiscoLoader />
      <ADotLoader />
      <APageLoader />
      <AMenuBase anchorRef={buttonRef} />
      <AMenu anchorRef={buttonRef} />
      <APagination />
      <APanel />
      <APanelHeader />
      <APanelTitle />
      <APanelBody />
      <APanelFooter />
      <APopover anchorRef={buttonRef} />
      <AProgressbar />
      <ARadio />
      <ASelect />
      <ASimpleTable />
      <ASwitch />
      <ATabGroup />
      <ATab />
      <ATabHeading />
      <ATag />
      <ATextarea />
      <ATextInput />
      <ThemedComponent>
        <ATheme defaultTheme="dusk">
          <ThemedComponent />
        </ATheme>
      </ThemedComponent>
      <ATimeline />
      <ATimelineItem />
      <ATimelineItemBody />
      <ATimelineItemTitle />
      <ATooltip anchorRef={buttonRef} />
      <ATree items={[]} />
    </AApp>
  );
};

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);
ReactDOM.render(<App />, document.getElementById("root"));
