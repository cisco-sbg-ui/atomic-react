import React, {useEffect, useRef} from "react";
import {useABreakpoint} from "../framework";

const ToasterComponent = () => {
  const {addToast} = useAToaster();

  useEffect(() => {
    addToast({title: "info toast", children: "toaster notification"});
  }, []);

  return null;
};

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
  const {xs, sm, md, lg, xl} = useABreakpoint();
  return (
    <AApp>
      {xs && "Extra Small"}
      {sm && "Small"}
      {md && "Medium"}
      {lg && "Large"}
      {xl && "Extra Large"}
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
      <AFieldBase />
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
      <ASlider />
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
      <AToast />
      <ATooltip anchorRef={buttonRef} />
      <ATree items={[]} />
      <ToasterComponent />
    </AApp>
  );
};

export default App;
