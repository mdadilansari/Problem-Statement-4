# ElementStyle.md

## Purpose
This file documents all approved UI components and key design system guidelines from the Siemens Element Design System ([element.siemens.io](https://element.siemens.io/components/)). Use this as a reference to ensure UI designs match the official Element look and feel for GHCP-driven UI generation.

---

## 1. Core Design System Guidelines
- **Typography:** Use Siemens Element typography standards ([Typography](https://element.siemens.io/fundamentals/typography/)).
- **Color Palette:** Use only approved UI and data visualization colors ([UI Colors](https://element.siemens.io/fundamentals/colors/ui-colors/), [Data Visualization Colors](https://element.siemens.io/fundamentals/colors/data-visualization-colors/)).
- **Shapes & Elevation:** Follow official shapes, border radii, and elevation ([Shapes](https://element.siemens.io/fundamentals/shapes/), [Elevation](https://element.siemens.io/fundamentals/elevation/)).
- **Spacing & Layout:** Use the grid, spacing, and breakpoints ([Grid](https://element.siemens.io/fundamentals/layouts/grid/), [Spacing](https://element.siemens.io/fundamentals/layouts/spacing/), [Breakpoints](https://element.siemens.io/fundamentals/layouts/breakpoints/)).
- **Icons:** Use only Element icons ([Icons](https://element.siemens.io/fundamentals/icons/)).
- **Motion:** Follow official motion/animation guidelines ([Motion & Animation](https://element.siemens.io/architecture/motion-animation/)).

### Brand Logo Implementation
The Element Design System uses CSS custom properties for theme-provided brand logos:
- **CSS Variables:**
  - `--element-brand-logo`: URL to logo SVG (format: `url("data:image/svg+xml,...")`)
  - `--element-brand-logo-width`: Logo width in CSS units (e.g., `136.221px`)
  - `--element-brand-logo-height`: Logo height in CSS units (max 48px, e.g., `12px`)
  - `--element-brand-logo-text`: Accessible text representation (e.g., `"Siemens logo"`)
- **Official Siemens Logo:** Provided by themes (`element-theme-siemens-brand-light` and `element-theme-siemens-brand-dark`)
- **Element Default Logo:** SVG triangle logo included in Element theme
- **Implementation:** Use `SiHeaderLogoDirective` (Angular) or CSS `content` property with logo variables
- **Theme Support:** Logos automatically switch between light/dark themes via CSS variables
- **Example (HTML):**
  ```html
  <div class="header-logo" aria-label="Siemens"></div>
  ```
- **Example (CSS):**
  ```css
  .header-logo {
    inline-size: var(--element-brand-logo-width);
    block-size: var(--element-brand-logo-height);
    content: var(--element-brand-logo) / var(--element-brand-logo-text);
  }
  ```

---

## 2. Approved UI Components

### Layout & Navigation

**Accordion**
  - Usage: Collapsible panels for organizing content hierarchically.
  - Angular usage:
    ```ts
    import { SiAccordionComponent, SiCollapsiblePanelComponent } from '@siemens/element-ng/accordion';
    @Component({
      imports: [SiAccordionComponent, SiCollapsiblePanelComponent]
    })
    ```
  - Template example:
    ```html
    <si-accordion>
      <si-collapsible-panel heading="Panel 1">
        Content for panel 1
      </si-collapsible-panel>
      <si-collapsible-panel heading="Panel 2">
        Content for panel 2
      </si-collapsible-panel>
    </si-accordion>
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/accordion/)
  - **Best practices:**
    - Use for hierarchical content organization
    - Keep panel headings concise and descriptive
    - Use `si-collapsible-panel` for individual accordion items
    - Support keyboard navigation for accessibility

**Application Header**
  - Usage: Top-level navigation header with branding, navigation, and user actions.
  - Angular usage:
    ```ts
    import { 
      SiApplicationHeaderComponent,
      SiHeaderBrandDirective,
      SiHeaderLogoDirective,
      SiHeaderActionsDirective,
      SiHeaderAccountItemComponent,
      SiLaunchpadFactoryComponent
    } from '@siemens/element-ng/application-header';
    @Component({
      imports: [
        SiApplicationHeaderComponent,
        SiHeaderBrandDirective,
        SiHeaderLogoDirective,
        SiHeaderActionsDirective,
        SiHeaderAccountItemComponent,
        SiLaunchpadFactoryComponent
      ]
    })
    ```
  - Template example:
    ```html
    <si-application-header [launchpad]="launchpad">
      <si-header-brand>
        <a siHeaderLogo routerLink="/"></a>
        <h1 class="application-name">App Name</h1>
      </si-header-brand>
      <si-header-actions>
        <button si-header-account-item name="User Name"></button>
      </si-header-actions>
    </si-application-header>
    <ng-template #launchpad>
      <si-launchpad-factory [apps]="appItems" />
    </ng-template>
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/application-header/)
  - [API](https://github.com/siemens/element/blob/main/api-goldens/element-ng/application-header/index.api.md)
  - **Best practices:**
    - Use `SiHeaderBrandDirective` for brand section with logo
    - Use `SiHeaderLogoDirective` for clickable logo with proper aria-label
    - Use `SiHeaderActionsDirective` for user actions and account items
    - Provide launchpad template for app switcher functionality
    - Use `expandBreakpoint` to control responsive navigation collapse
    - Support mobile navigation with `mobileNavigationExpanded` signal

**Breadcrumb**
  - Usage: Navigation trail showing user's location in application hierarchy.
  - Angular usage:
    ```ts
    import { SiBreadcrumbComponent, BreadcrumbItem } from '@siemens/element-ng/breadcrumb';
    @Component({
      imports: [SiBreadcrumbComponent]
    })
    ```
  - Template example:
    ```html
    <si-breadcrumb [items]="breadcrumbItems"></si-breadcrumb>
    ```
  - Component example:
    ```ts
    breadcrumbItems: BreadcrumbItem[] = [
      { title: 'Home', link: '/' },
      { title: 'Products', link: '/products' },
      { title: 'Details' }
    ];
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/breadcrumb/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/layout-navigation/breadcrumb.md)
  - **Best practices:**
    - Use for deep navigation hierarchies
    - Last item should represent current page (no link)
    - Keep breadcrumb labels concise
    - Use `SiBreadcrumbRouterComponent` for Angular Router integration
    - Provide proper aria-labels for accessibility

**Cards**
  - Usage: Container for grouping related content with optional header, body, and footer.
  - Angular usage:
    ```ts
    import { SiCardComponent } from '@siemens/element-ng/card';
    @Component({
      imports: [SiCardComponent]
    })
    ```
  - Template example:
    ```html
    <si-card heading="Card Title">
      <div body>Card content goes here</div>
      <div footer>Card footer actions</div>
    </si-card>
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/cards/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/layout-navigation/cards.md)
  - **Best practices:**
    - Use for grouping related content
    - Use `heading` input for card titles
    - Use content projection slots: `[body]`, `[footer]`, `[headerIcon]`
    - Combine with content action bar for card actions
    - Use `accent` input for visual emphasis

**Dashboard**
  - Usage: Container for dashboard layout with expandable cards and menu bar.
  - Angular usage:
    ```ts
    import { 
      SiDashboardComponent, 
      SiDashboardCardComponent,
      SiValueWidgetComponent,
      SiListWidgetComponent,
      SiTimelineWidgetComponent,
      SiLinkWidgetComponent
    } from '@siemens/element-ng/dashboard';
    @Component({
      imports: [
        SiDashboardComponent,
        SiDashboardCardComponent,
        SiValueWidgetComponent,
        SiListWidgetComponent,
        SiTimelineWidgetComponent,
        SiLinkWidgetComponent
      ]
    })
    ```
  - Template example:
    ```html
    <si-dashboard #dashboard heading="Dashboard Title">
      <div dashboard>
        <div class="row">
          <div class="col-md-6">
            <si-dashboard-card heading="Card 1">
              <div body>Card content</div>
            </si-dashboard-card>
          </div>
        </div>
      </div>
    </si-dashboard>
    ```
  - [Docs](https://element.siemens.io/components/dashboards/dashboard/)
  - [API](https://github.com/siemens/element/blob/main/api-goldens/element-ng/dashboard/index.api.md)
  - **Best practices:**
    - Use `SiDashboardComponent` as container with `heading` input
    - Use `SiDashboardCardComponent` (extends `SiCardComponent`) for expandable cards
    - Enable expand interactions with `enableExpandInteractions` input
    - Use `expand(card)` and `restore()` methods programmatically
    - Use content projection slot `[menubar]` for dashboard-level actions
    - Use `sticky` input to control sticky heading and menu bar behavior
    - Combine with Bootstrap grid for responsive layouts
    - Use dashboard widgets for specialized content types

**Electron Titlebar**
  - Usage: Custom titlebar for Electron apps with browser-style navigation.
  - Angular usage:
    ```ts
    import { SiElectrontitlebarComponent } from '@siemens/element-ng/electron-titlebar';
    @Component({
      imports: [SiElectrontitlebarComponent]
    })
    ```
  - Template example:
    ```html
    <si-electron-titlebar
      [menuItems]="titlebarItems"
      (forward)="goForward()"
      (back)="goBack()"
    />
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/electron-titlebar/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/layout-navigation/electron-titlebar.md)
  - **Best practices:**
    - Use only for Electron desktop applications
    - Provide forward/back navigation handlers
    - Include zoom and refresh functions in menuItems
    - Use `runsInElectron()` helper to detect Electron environment
    - Provide proper aria-labels for navigation buttons

**Flexible Dashboards**
  - Usage: Advanced dashboard system with drag-and-drop, widget catalog, and persistence.
  - Angular usage:
    ```ts
    import { 
      SiFlexibleDashboardComponent,
      SiGridComponent,
      SiWidgetCatalogComponent,
      Widget
    } from '@siemens/dashboards-ng';
    @Component({
      imports: [
        SiFlexibleDashboardComponent,
        SiGridComponent,
        SiWidgetCatalogComponent
      ]
    })
    ```
  - Template example:
    ```html
    <si-flexible-dashboard
      [widgetCatalog]="widgetCatalog"
      [dashboardId]="'my-dashboard'"
    />
    ```
  - [Docs](https://element.siemens.io/components/dashboards/flexible-dashboards/)
  - **Best practices:**
    - Use for customizable user dashboards
    - Define widget descriptors with componentFactory
    - Support web components and module federation
    - Implement widget storage with `SI_WIDGET_STORE` provider
    - Use `SiWidgetCatalogComponent` for user-selectable widgets
    - Configure with `forRoot()` method for dashboard API

**Footer**
  - Usage: Application footer with links and copyright information.
  - Angular usage:
    ```ts
    import { SiFooterComponent } from '@siemens/element-ng/footer';
    @Component({
      imports: [SiFooterComponent]
    })
    ```
  - Template example:
    ```html
    <si-footer>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </si-footer>
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/footer/)
  - **Best practices:**
    - Use for legal links and copyright notices
    - Keep footer content minimal and organized
    - Use with Element layout patterns

**Launchpad**
  - Usage: App switcher for navigating between applications.
  - Angular usage:
    ```ts
    import { SiLaunchpadFactoryComponent, App, AppCategory } from '@siemens/element-ng/application-header';
    @Component({
      imports: [SiLaunchpadFactoryComponent]
    })
    ```
  - Template example:
    ```html
    <ng-template #launchpad>
      <si-launchpad-factory [apps]="appItems" />
    </ng-template>
    ```
  - Component example:
    ```ts
    appItems: (App | AppCategory)[] = [
      { name: 'App 1', url: 'https://app1.example.com', icon: 'element-home' },
      { name: 'App 2', url: 'https://app2.example.com', icon: 'element-settings' }
    ];
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/launchpad/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/layout-navigation/launchpad.md)
  - **Best practices:**
    - Use within `si-application-header` component
    - Provide launchpad template via `[launchpad]` input
    - Use `App` type for individual apps or `AppCategory` for grouped apps
    - Include app icons for visual recognition
    - Use `launchpadLabel` input for accessibility

**List-Details**
  - Usage: Master-detail pattern with list view and detail pane.
  - Angular usage:
    ```ts
    import { 
      SiDetailsPaneHeaderComponent,
      SiDetailsPaneBodyComponent,
      SiDetailsPaneFooterComponent
    } from '@siemens/element-ng/list-details';
    @Component({
      imports: [
        SiDetailsPaneHeaderComponent,
        SiDetailsPaneBodyComponent,
        SiDetailsPaneFooterComponent
      ]
    })
    ```
  - Template example:
    ```html
    <si-details-pane-header title="Details" [hideBackButton]="false">
      <si-tabset>
        <a si-tab heading="Overview" routerLink="overview"></a>
        <a si-tab heading="History" routerLink="history"></a>
      </si-tabset>
    </si-details-pane-header>
    <si-details-pane-body>
      Detail content
    </si-details-pane-body>
    <si-details-pane-footer>
      Footer actions
    </si-details-pane-footer>
    ```
  - [Docs](https://element.siemens.io/patterns/list-details/)
  - **Best practices:**
    - Use for master-detail layouts
    - Use `si-details-pane-header` with title and optional tabs
    - Use `si-details-pane-body` for scrollable content
    - Use `si-details-pane-footer` for actions
    - Integrate with Angular Router for detail views

**Modals**
  - Usage: Overlay dialogs for focused user interactions.
  - Angular usage:
    ```ts
    import { SiModalService, ModalRef } from '@siemens/element-ng/modal';
    @Component({
      imports: []
    })
    export class MyComponent {
      constructor(private modalService: SiModalService) {}
      showModal() {
        const modalRef = this.modalService.show(this.template, {
          keyboard: true,
          ignoreBackdropClick: false
        });
      }
    }
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/modals/)
  - **Best practices:**
    - Use for confirmation dialogs and forms
    - Use `SiModalService.show()` to open modals programmatically
    - Configure with keyboard and backdrop options
    - Use modal sizes: `modal-sm`, `modal-lg`, `modal-xl`
    - Provide clear actions (primary/cancel)
    - Support ESC key for dismissal

**Pagination**
  - Usage: Navigate through pages of data.
  - Angular usage:
    ```ts
    import { SiPaginationComponent } from '@siemens/element-ng/pagination';
    @Component({
      imports: [SiPaginationComponent]
    })
    ```
  - Template example:
    ```html
    <si-pagination
      [(currentPage)]="currentPage"
      [totalPages]="totalPages"
    />
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/pagination/)
  - [API](https://github.com/siemens/element/blob/main/api-goldens/element-ng/pagination/index.api.md)
  - **Best practices:**
    - Use for paged data (tables, lists)
    - Use two-way binding with `[(currentPage)]`
    - Provide `totalPages` input
    - Customize button text with `backButtonText`, `forwardButtonText`
    - Provide `navAriaLabel` for accessibility
    - Use with datatable for seamless integration

**Side Panel**
  - Usage: Collapsible side navigation panel.
  - Angular usage:
    ```ts
    import { 
      SiSidePanelComponent,
      SiSidePanelContentComponent,
      SiSidePanelService,
      SidePanelMode,
      SidePanelSize
    } from '@siemens/element-ng/side-panel';
    @Component({
      imports: [
        SiSidePanelComponent,
        SiSidePanelContentComponent
      ]
    })
    ```
  - Template example:
    ```html
    <si-side-panel [collapsed]="collapsed" [mode]="mode" [size]="size">
      <si-side-panel-content>
        Side panel content
      </si-side-panel-content>
    </si-side-panel>
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/side-panel/)
  - [API](https://github.com/siemens/element/blob/main/projects/element-ng/side-panel/index.ts)
  - **Best practices:**
    - Use for navigation or auxiliary content
    - Use `mode` for behavior: `'scroll'` or `'over'`
    - Use `size` for width: `'regular'` or `'wide'`
    - Use `collapsible` input to enable collapse functionality
    - Use `SiSidePanelService` for programmatic control
    - Use portal patterns for dynamic content

**Split**
  - Usage: Resizable split panes (horizontal or vertical).
  - Angular usage:
    ```ts
    import { 
      SiSplitComponent,
      SiSplitPartComponent,
      SplitOrientation
    } from '@siemens/element-ng/split';
    @Component({
      imports: [
        SiSplitComponent,
        SiSplitPartComponent
      ]
    })
    ```
  - Template example:
    ```html
    <si-split [orientation]="orientation">
      <si-split-part [size]="50">
        Left pane content
      </si-split-part>
      <si-split-part [size]="50">
        Right pane content
      </si-split-part>
    </si-split>
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/split/)
  - [API](https://github.com/siemens/element/blob/main/api-goldens/element-ng/split/index.api.md)
  - **Best practices:**
    - Use for resizable layouts
    - Use `orientation`: `'horizontal'` or `'vertical'`
    - Define initial sizes with `[size]` on split parts
    - Use `collapseDirection` for collapsible panes
    - Support nested splits for complex layouts
    - Use `auto` size for flexible panes

**Tabs**
  - Usage: Organize content into switchable tabs.
  - Angular usage:
    ```ts
    import { SiTabsetComponent, SiTabComponent, SiTabLinkComponent } from '@siemens/element-ng/tabs';
    @Component({
      imports: [
        SiTabsetComponent,
        SiTabComponent,
        SiTabLinkComponent
      ]
    })
    ```
  - Template example:
    ```html
    <si-tabset>
      <si-tab heading="Tab 1">Content 1</si-tab>
      <si-tab heading="Tab 2">Content 2</si-tab>
      <si-tab heading="Tab 3">Content 3</si-tab>
    </si-tabset>
    ```
  - Template with routing:
    ```html
    <si-tabset>
      <a si-tab heading="Tab 1" routerLink="tab1"></a>
      <a si-tab heading="Tab 2" routerLink="tab2"></a>
    </si-tabset>
    <router-outlet></router-outlet>
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/tabs/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/layout-navigation/tabs.md)
  - **Best practices:**
    - Use for organizing related content
    - Use `si-tab` for content tabs
    - Use `si-tab` with `routerLink` for router integration
    - Use icons with `icon` input for visual cues
    - Support keyboard navigation (arrow keys)
    - Avoid using legacy `SiTabsLegacyModule` (deprecated)

**Tour**
  - Usage: Guided tour overlay for onboarding users.
  - Angular usage:
    ```ts
    import { SiTourService, TourStep, TourOptions } from '@siemens/element-ng/tour';
    @Component({})
    export class MyComponent implements OnInit, OnDestroy {
      constructor(private tourService: SiTourService) {}
      
      ngOnInit() {
        const steps: TourStep[] = [
          {
            id: 'step1',
            attachTo: { element: '#element1', on: 'bottom' },
            text: 'Welcome to step 1',
            buttons: ['next']
          }
        ];
        this.tourService.addSteps(steps);
        this.tourService.start();
      }
      
      ngOnDestroy() {
        this.tourService.complete();
      }
    }
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/tour/)
  - [API](https://github.com/siemens/element/blob/main/api-goldens/element-ng/tour/index.api.md)
  - **Best practices:**
    - Use for user onboarding and feature discovery
    - Define tour steps with `TourStep[]`
    - Use `attachTo` to target specific elements
    - Provide clear step text and navigation buttons
    - Use `onTourComplete` and `onTourCancel` observables
    - Call `clearSteps()` before adding new tours
    - Support async element loading with retry logic

**Vertical Navigation**
  - Usage: Collapsible vertical navigation menu.
  - Angular usage:
    ```ts
    import { SiNavbarVerticalComponent, NavbarVerticalItem } from '@siemens/element-ng/navbar-vertical';
    @Component({
      imports: [SiNavbarVerticalComponent]
    })
    ```
  - Template example:
    ```html
    <si-navbar-vertical
      [items]="menuItems"
      navbarCollapseButtonText="Collapse"
      navbarExpandButtonText="Expand"
    />
    ```
  - Component example:
    ```ts
    menuItems: NavbarVerticalItem[] = [
      {
        type: 'group',
        label: 'Home',
        children: [
          { type: 'router-link', label: 'Dashboard', routerLink: '/dashboard' }
        ]
      },
      { type: 'router-link', label: 'Settings', routerLink: '/settings', icon: 'element-settings' }
    ];
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/vertical-navigation/)
  - **Best practices:**
    - Use for primary navigation
    - Use `NavbarVerticalItem` types: `'group'`, `'router-link'`, `'action'`, `'header'`
    - Support nested groups with `children` array
    - Include icons for visual navigation
    - Use with side panel for collapsible layouts
    - Provide collapse/expand button text for accessibility

**Wizard**
  - Usage: Multi-step form wizard with navigation.
  - Angular usage:
    ```ts
    import { SiWizardComponent, SiWizardStepComponent } from '@siemens/element-ng/wizard';
    @Component({
      imports: [
        SiWizardComponent,
        SiWizardStepComponent
      ]
    })
    ```
  - Template example:
    ```html
    <si-wizard
      [hasCancel]="true"
      [enableCompletionPage]="true"
      (completionAction)="onComplete()"
      (wizardCancel)="onCancel()"
    >
      <si-wizard-step heading="Step 1">
        Step 1 content
      </si-wizard-step>
      <si-wizard-step heading="Step 2">
        Step 2 content
      </si-wizard-step>
    </si-wizard>
    ```
  - [Docs](https://element.siemens.io/components/layout-navigation/wizard/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/layout-navigation/wizard.md)
  - **Best practices:**
    - Use for multi-step processes (forms, onboarding)
    - Use `si-wizard-step` with `heading` for each step
    - Control navigation with `canNext()` and `canBack()` methods
    - Use `verticalLayout` for side-by-side step list
    - Use `inlineNavigation` for inline navigation buttons
    - Support step validation before proceeding
    - Use `showStepNumbers` for numbered steps
    - Configure vertical layout sizing with `verticalMinSize`, `verticalMaxSize`
    - Use `enableCompletionPage` for success feedback

### Forms & Inputs
**Checkbox**
	- Usage: Boolean selection.
	- Example:
		```html
		<si-checkbox [(ngModel)]="checked">Label</si-checkbox>
		```
	- [Docs](https://element.siemens.io/components/forms-inputs/checkbox/)

**Input**
  - Usage: Standard text input field.
  - Angular usage:
    ```ts
    import { SiInputComponent } from '@siemens/element-ng/input';
    @Component({
      imports: [SiInputComponent]
    })
    ```
  - Template example:
    ```html
    <si-input placeholder="Enter value" [(ngModel)]="value"></si-input>
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/input/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/forms-inputs/input.md)
  - **Best practices:**
    - Use with Angular Forms for validation and reactive patterns.
    - Use `placeholder` for hints, and always provide accessible labels.
    - Supports two-way binding with `[(ngModel)]` or reactive forms.
    - For custom styling, use CSS variables as documented in the API.

**Select**
  - Usage: Dropdown selection from a list.
  - Angular usage:
    ```ts
    import { SiSelectComponent, SiOptionComponent } from '@siemens/element-ng/select';
    @Component({
      imports: [SiSelectComponent, SiOptionComponent]
    })
    ```
  - Template example:
    ```html
    <si-select [(ngModel)]="selected">
      <si-option *ngFor="let opt of options" [value]="opt.value">{{ opt.label }}</si-option>
    </si-select>
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/select/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/forms-inputs/select.md)
  - **Best practices:**
    - Use with Angular Forms for validation and reactive patterns.
    - Always provide accessible labels for selects.
    - Use `si-option` for each selectable value.
    - Supports two-way binding with `[(ngModel)]` or reactive forms.
    - For custom styling, use CSS variables as documented in the API.

**Radio**
  - Usage: Single selection from multiple options in a form.
  - Angular usage:
    ```ts
    import { SiRadioComponent } from '@siemens/element-ng/radio';
    @Component({
      imports: [SiRadioComponent, ReactiveFormsModule]
    })
    ```
  - Template example:
    ```html
    <div class="form-check">
      <input type="radio" class="form-check-input" name="options" value="option1" [(ngModel)]="selected" />
      <label class="form-check-label">Option 1</label>
    </div>
    <div class="form-check">
      <input type="radio" class="form-check-input" name="options" value="option2" [(ngModel)]="selected" />
      <label class="form-check-label">Option 2</label>
    </div>
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/radio/)
  - **Best practices:**
    - Use radio buttons when user must select exactly one option from multiple choices
    - Group related radio buttons with same `name` attribute
    - Always provide accessible labels with `for` attribute
    - Use with Angular Forms for validation

**Switch**
  - Usage: Toggle between two states (on/off, enabled/disabled).
  - Angular usage:
    ```ts
    import { FormsModule } from '@angular/forms';
    @Component({
      imports: [FormsModule]
    })
    ```
  - Template example:
    ```html
    <div class="form-check form-switch">
      <input type="checkbox" class="form-check-input" role="switch" [(ngModel)]="enabled" />
      <label class="form-check-label">Enable feature</label>
    </div>
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/switch/)
  - **Best practices:**
    - Use for binary on/off settings
    - Provide immediate feedback when toggled
    - Use clear labels that indicate what will happen when switched
    - Consider using for settings that take effect immediately

**Textarea**
  - Usage: Multi-line text input for longer content.
  - Angular usage:
    ```ts
    import { FormsModule } from '@angular/forms';
    @Component({
      imports: [FormsModule]
    })
    ```
  - Template example:
    ```html
    <textarea class="form-control" rows="4" [(ngModel)]="description" placeholder="Enter description"></textarea>
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/textarea/)
  - **Best practices:**
    - Set appropriate `rows` for expected content length
    - Always provide accessible labels
    - Consider using `maxlength` for character limits
    - Use with Angular Forms for validation

**Datepicker**
  - Usage: Calendar-based date selection with optional time picker.
  - Angular usage:
    ```ts
    import { SiDatepickerDirective, SiDatepickerComponent, SiCalendarButtonComponent } from '@siemens/element-ng/datepicker';
    @Component({
      imports: [SiDatepickerDirective, SiDatepickerComponent, SiCalendarButtonComponent, FormsModule]
    })
    ```
  - Template example:
    ```html
    <input type="text" class="form-control" siDatepicker [(ngModel)]="selectedDate" placeholder="Select date" />
    <si-calendar-button></si-calendar-button>
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/datepicker/)
  - **Best practices:**
    - Use `siDatepicker` directive on input elements
    - Configure locale-specific date formats with `getDatepickerFormat(locale, config)`
    - Support time selection with `showTime` configuration
    - Use `minDate` and `maxDate` to restrict selectable dates
    - Provide accessible date format in placeholder

**Date Range Filter**
  - Usage: Select date ranges with presets and advanced filtering options.
  - Angular usage:
    ```ts
    import { SiDateRangeFilterComponent, DateRangeFilter, DateRangePreset } from '@siemens/element-ng/date-range-filter';
    @Component({
      imports: [SiDateRangeFilterComponent]
    })
    ```
  - Template example:
    ```html
    <si-date-range-filter
      [(range)]="dateRange"
      [presetList]="presets"
      [showApply]="true"
      (applyClicked)="applyFilter()"
    />
    ```
  - TypeScript example:
    ```ts
    presets: DateRangePreset[] = [
      { label: 'Last 24h', offset: 24 * 60 * 60 * 1000 },
      { label: 'Last 7 days', offset: 7 * 24 * 60 * 60 * 1000 },
      { type: 'custom', label: 'Past month', calculate: () => ({ start: startDate, end: endDate }) }
    ];
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/date-range-filter/)
  - **Best practices:**
    - Provide preset ranges for common selections (today, last week, last month)
    - Use `enableTimeSelection` for granular time-based filtering
    - Configure `presetSearch` for searchable preset lists
    - Use with overlay/popover for inline filtering

**Number Input**
  - Usage: Numeric input with increment/decrement controls.
  - Angular usage:
    ```ts
    import { SiNumberInputComponent } from '@siemens/element-ng/number-input';
    @Component({
      imports: [SiNumberInputComponent, ReactiveFormsModule]
    })
    ```
  - Template example:
    ```html
    <si-number-input
      class="form-control"
      [min]="0"
      [max]="100"
      [step]="1"
      formControlName="quantity"
    />
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/number-input/)
  - **Best practices:**
    - Set appropriate `min`, `max`, and `step` values
    - Use with reactive forms for validation
    - Provide accessible labels
    - Consider decimal precision for currency or measurements

**Phone Number Input**
  - Usage: International phone number input with country code selection.
  - Angular usage:
    ```ts
    import { SiPhoneNumberInputComponent, PhoneDetails } from '@siemens/element-ng/phone-number';
    @Component({
      imports: [SiPhoneNumberInputComponent, ReactiveFormsModule]
    })
    ```
  - Template example:
    ```html
    <si-phone-number-input
      class="form-control"
      formControlName="phoneNumber"
      defaultCountry="US"
      [supportedCountries]="['US', 'DE', 'CH', 'IN']"
      placeholderForSearch="Search country"
      selectCountryAriaLabel="Select country"
      (valueChange)="onPhoneChange($event)"
    />
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/phone-number-input/)
  - **Best practices:**
    - Specify `supportedCountries` to limit available regions
    - Use `defaultCountry` for initial country selection
    - Validate with `invalidPhoneNumberFormat` and `notSupportedPhoneNumberCountry` errors
    - Provide accessible labels for search and selection

**Color Picker**
  - Usage: Visual color selection with hex/rgb input.
  - Angular usage:
    ```ts
    import { SiColorPickerComponent } from '@siemens/element-ng/color-picker';
    @Component({
      imports: [SiColorPickerComponent, FormsModule]
    })
    ```
  - Template example:
    ```html
    <si-color-picker [(ngModel)]="selectedColor"></si-color-picker>
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/color-picker/)
  - **Best practices:**
    - Use for applications requiring color customization
    - Support hex, RGB, and HSL formats
    - Provide color preview
    - Use with Angular Forms for validation

**File Uploader**
  - Usage: Upload single or multiple files with progress tracking.
  - Angular usage:
    ```ts
    import { SiFileUploaderComponent, FileUploadResult } from '@siemens/element-ng/file-uploader';
    @Component({
      imports: [SiFileUploaderComponent]
    })
    ```
  - Template example:
    ```html
    <si-file-uploader
      [maxFiles]="5"
      [maxFileSize]="10485760"
      [acceptedFileTypes]="'.pdf,.doc,.docx'"
      (uploadStarted)="onUploadStart($event)"
      (uploadCompleted)="onUploadComplete($event)"
      (uploadFailed)="onUploadFailed($event)"
    />
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/file-uploader/)
  - **Best practices:**
    - Set `maxFiles` and `maxFileSize` limits
    - Specify `acceptedFileTypes` to restrict file extensions
    - Provide upload progress feedback
    - Handle upload errors with clear messages
    - Use drag-and-drop with `SiFileDropzoneComponent`

**Photo Uploader**
  - Usage: Upload and crop profile photos or avatars.
  - Angular usage:
    ```ts
    import { SiPhotoUploadComponent } from '@siemens/element-ng/photo-upload';
    @Component({
      imports: [SiPhotoUploadComponent]
    })
    ```
  - Template example:
    ```html
    <si-photo-upload
      [modalHeader]="'Avatar photo'"
      [outputFormat]="'jpeg'"
      (photoChanged)="onPhotoChanged($event)"
    />
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/photo-upload/)
  - **Best practices:**
    - Integrate with avatar components for user profiles
    - Support image cropping with ImageCropperComponent
    - Specify output format (jpeg, png, webp)
    - Provide modal for editing and cropping
    - Use with `SiAvatarBackgroundColorDirective` for color theming

**Pills Input**
  - Usage: Tag-based input for multiple values (e.g., emails, keywords).
  - Angular usage:
    ```ts
    import { SiPillsInputComponent } from '@siemens/element-ng/pills-input';
    @Component({
      imports: [SiPillsInputComponent, FormsModule]
    })
    ```
  - Template example:
    ```html
    <si-pills-input
      [(ngModel)]="tags"
      placeholder="Add tags"
      [allowDuplicates]="false"
    />
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/pills-input/)
  - **Best practices:**
    - Use for multi-value inputs like tags, recipients, or keywords
    - Set `allowDuplicates` based on use case
    - Provide autocomplete suggestions for common values
    - Use with Angular Forms for validation

**Threshold**
  - Usage: Configure threshold values for monitoring and alerts.
  - Angular usage:
    ```ts
    import { SiThresholdComponent } from '@siemens/element-ng/threshold';
    @Component({
      imports: [SiThresholdComponent, FormsModule]
    })
    ```
  - Template example:
    ```html
    <si-threshold
      [(ngModel)]="thresholdValue"
      [min]="0"
      [max]="100"
      [warningThreshold]="70"
      [criticalThreshold]="90"
    />
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/threshold/)
  - **Best practices:**
    - Use for setting alert or monitoring thresholds
    - Clearly visualize warning and critical levels
    - Provide feedback when thresholds are exceeded
    - Use with Angular Forms for validation

**Slider**
  - Usage: Select numeric value from a range using a draggable control.
  - Angular usage:
    ```ts
    import { SiSliderComponent } from '@siemens/element-ng/slider';
    @Component({
      imports: [SiSliderComponent, FormsModule]
    })
    ```
  - Template example:
    ```html
    <si-slider
      [(ngModel)]="volume"
      [min]="0"
      [max]="100"
      [step]="5"
    />
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/slider/)
  - **Best practices:**
    - Use for continuous value selection (volume, brightness, zoom)
    - Set appropriate `min`, `max`, and `step` values
    - Display current value near slider
    - Support keyboard navigation for accessibility

**Language Switcher**
  - Usage: Allow users to change application language.
  - Angular usage:
    ```ts
    import { SiLanguageSwitcherComponent } from '@siemens/element-ng/language-switcher';
    import { TranslateModule } from '@ngx-translate/core';
    @Component({
      imports: [SiLanguageSwitcherComponent, TranslateModule]
    })
    ```
  - Template example:
    ```html
    <si-language-switcher />
    ```
  - [Docs](https://element.siemens.io/components/forms-inputs/language-switcher/)
  - **Best practices:**
    - Integrate with `@ngx-translate/core` for i18n
    - Place in application header or settings
    - Support all available locales in application
    - Persist language preference

### Buttons & Menus
**Buttons**
  - Usage: For primary, secondary, and icon actions.
  - Angular usage:
    ```ts
    import { SiButtonComponent } from '@siemens/element-ng/button';
    @Component({
      imports: [SiButtonComponent]
    })
    ```
  - Template example:
    ```html
    <si-button type="primary">Primary</si-button>
    <si-button type="secondary">Secondary</si-button>
    <si-button type="icon"><si-icon name="elementPlus"></si-icon></si-button>
    ```
  - [Docs](https://element.siemens.io/components/buttons-menus/buttons/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/buttons-menus/buttons.md)
  - **Best practices:**
    - Use the correct `type` for semantic meaning (primary, secondary, icon, etc.).
    - Use `disabled` for non-interactive states.
    - Use icons for visual cues, but always provide accessible text.
    - For custom styling, use CSS variables as documented in the API.

**Button Group**
  - Usage: Group related buttons for collective actions.
  - Angular usage:
    ```ts
    import { SiButtonGroupComponent } from '@siemens/element-ng/button-group';
    @Component({
      imports: [SiButtonGroupComponent]
    })
    ```
  - Template example:
    ```html
    <si-button-group>
      <si-button type="primary">Save</si-button>
      <si-button type="secondary">Cancel</si-button>
    </si-button-group>
    ```
  - [Docs](https://element.siemens.io/components/buttons-menus/button-group/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/buttons-menus/button-group.md)
  - **Best practices:**
    - Use for related actions that should be visually grouped.
    - Maintain consistent button sizes and spacing.
    - Use with accessible labels for each button.

**Content Action Bar**
  - Usage: Toolbar for content areas, often with primary and secondary actions.
  - Angular usage:
    ```ts
    import { SiContentActionBarComponent } from '@siemens/element-ng/content-action-bar';
    @Component({
      imports: [SiContentActionBarComponent]
    })
    ```
  - Template example:
    ```html
    <si-content-action-bar>
      <si-button type="primary">Main Action</si-button>
      <si-button type="secondary">Secondary</si-button>
    </si-content-action-bar>
    ```
  - [Docs](https://element.siemens.io/components/buttons-menus/content-actions/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/buttons-menus/content-actions.md)
  - **Best practices:**
    - Place most important actions to the left.
    - Use icons for quick recognition.
    - Group related actions together.

**Dropdowns**
  - Usage: Show a menu of actions or options.
  - Angular usage:
    ```ts
    import { SiDropdownComponent } from '@siemens/element-ng/dropdown';
    @Component({
      imports: [SiDropdownComponent]
    })
    ```
  - Template example:
    ```html
    <si-dropdown label="Options">
      <si-dropdown-item>Item 1</si-dropdown-item>
      <si-dropdown-item>Item 2</si-dropdown-item>
    </si-dropdown>
    ```
  - [Docs](https://element.siemens.io/components/buttons-menus/dropdowns/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/buttons-menus/dropdowns.md)
  - **Best practices:**
    - Use for secondary or overflow actions.
    - Ensure dropdowns are keyboard accessible.
    - Use clear, concise labels for dropdown triggers.

**Help Button**
  - Usage: Contextual help trigger for tooltips or help dialogs.
  - Angular usage:
    ```ts
    import { SiHelpButtonComponent } from '@siemens/element-ng/help-button';
    @Component({
      imports: [SiHelpButtonComponent]
    })
    ```
  - Template example:
    ```html
    <si-help-button label="Help"></si-help-button>
    ```
  - [Docs](https://element.siemens.io/components/buttons-menus/help-button/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/buttons-menus/help-button.md)
  - **Best practices:**
    - Use for inline help or to trigger help dialogs.
    - Always provide accessible labels.

**Links**
  - Usage: Navigation or actions, styled as hyperlinks.
  - Angular usage:
    ```ts
    import { SiLinkComponent } from '@siemens/element-ng/link';
    @Component({
      imports: [SiLinkComponent]
    })
    ```
  - Template example:
    ```html
    <si-link href="/docs">Documentation</si-link>
    ```
  - [Docs](https://element.siemens.io/components/buttons-menus/links/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/buttons-menus/links.md)
  - **Best practices:**
    - Use for navigation, not for actions that change data.
    - Ensure links are accessible and have descriptive text.

**Menu**
  - Usage: Navigation or grouped actions, often in sidebars or dropdowns.
  - Angular usage:
    ```ts
    import { SiMenuComponent, SiMenuItemComponent } from '@siemens/element-ng/menu';
    @Component({
      imports: [SiMenuComponent, SiMenuItemComponent]
    })
    ```
  - Template example:
    ```html
    <si-menu>
      <si-menu-item label="Home"></si-menu-item>
      <si-menu-item label="Settings"></si-menu-item>
    </si-menu>
    ```
  - [Docs](https://element.siemens.io/components/buttons-menus/menu/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/buttons-menus/menu.md)
  - **Best practices:**
    - Use for navigation or grouped actions.
    - Organize menu items logically and accessibly.

### Lists, Tables, Trees
**List Group**
  - Usage: Display a list of items with consistent styling and optional actions.
  - Angular usage:
    ```ts
    import { SiListGroupComponent, SiListGroupItemComponent } from '@siemens/element-ng/list-group';
    @Component({
      imports: [SiListGroupComponent, SiListGroupItemComponent]
    })
    ```
  - Template example:
    ```html
    <si-list-group>
      <si-list-group-item>Item 1</si-list-group-item>
      <si-list-group-item>Item 2</si-list-group-item>
    </si-list-group>
    ```
  - [Docs](https://element.siemens.io/components/lists-tables-trees/list-group/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/lists-tables-trees/list-group.md)
  - **Best practices:**
    - Use for simple lists with optional actions or icons.
    - Keep list items concise and actionable.

**Table & Datatable**
  - Usage: Display tabular data with sorting, filtering, and actions.
  - Angular usage:
    ```ts
    import { SiTableComponent } from '@siemens/element-ng/table';
    @Component({
      imports: [SiTableComponent]
    })
    ```
  - Template example:
    ```html
    <si-table [data]="tableData">
      <!-- Define columns and rows as needed -->
    </si-table>
    ```
  - [Docs](https://element.siemens.io/components/lists-tables-trees/table/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/lists-tables-trees/table.md)
  - **Best practices:**
    - Use for structured data with multiple columns.
    - Enable sorting and filtering for large datasets.
    - Provide accessible headers and summaries.

**Tree View**
  - Usage: Display hierarchical data with expandable/collapsible nodes.
  - Angular usage:
    ```ts
    import { SiTreeViewComponent } from '@siemens/element-ng/tree-view';
    @Component({
      imports: [SiTreeViewComponent]
    })
    ```
  - Template example:
    ```html
    <si-tree-view [nodes]="treeNodes"></si-tree-view>
    ```
  - [Docs](https://element.siemens.io/components/lists-tables-trees/tree-view/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/lists-tables-trees/tree-view.md)
  - **Best practices:**
    - Use for nested or hierarchical data.
    - Allow keyboard navigation and accessibility.
    - Keep node labels clear and concise.

### Status & Notifications
**Toast Notification**
  - Usage: Temporary feedback messages.
  - Angular usage:
    ```ts
    import { SiToastNotificationService } from '@siemens/element-ng/toast-notification';
    @Component({})
    export class MyComponent {
      constructor(private toastService: SiToastNotificationService) {}
      showSuccess() {
        this.toastService.show('Message sent!', { type: 'success' });
      }
    }
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/toast-notification/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/status-notifications/toast-notification.md)
  - **Best practices:**
    - Use for brief, non-blocking feedback.
    - Use appropriate `type` (success, error, info, warning).
    - Keep messages concise and actionable.

**Tooltip**
  - Usage: Show contextual help on hover/focus.
  - Angular usage:
    ```ts
    import { SiTooltipDirective } from '@siemens/element-ng/tooltip';
    @Component({
      imports: [SiTooltipDirective]
    })
    ```
  - Template example:
    ```html
    <button siTooltip="Tooltip text">Hover me</button>
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/tooltip/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/status-notifications/tooltip.md)
  - **Best practices:**
    - Use for short, helpful hints.
    - Do not use tooltips for critical information.
    - Ensure tooltips are accessible and dismissible.

**Circle Status**
  - Usage: Display status indicators with semantic colors (success, info, warning, danger).
  - Angular usage:
    ```ts
    import { SiCircleStatusComponent } from '@siemens/element-ng/circle-status';
    @Component({
      imports: [SiCircleStatusComponent]
    })
    ```
  - Template example:
    ```html
    <si-circle-status status="success"></si-circle-status>
    <si-circle-status status="warning"></si-circle-status>
    <si-circle-status status="danger"></si-circle-status>
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/circle-status/)
  - **Best practices:**
    - Use for compact status visualization
    - Support status types: success, info, warning, danger, critical
    - Combine with labels for accessibility
    - Use consistently across application

**Status Bar**
  - Usage: Display multiple status items with optional blinking for attention.
  - Angular usage:
    ```ts
    import { SiStatusBarComponent } from '@siemens/element-ng/status-bar';
    @Component({
      imports: [SiStatusBarComponent]
    })
    ```
  - Template example:
    ```html
    <si-status-bar [items]="statusItems" [muted]="false"></si-status-bar>
    ```
  - TypeScript example:
    ```ts
    statusItems = [
      { label: 'Online', status: 'success' },
      { label: 'Warning', status: 'warning', blink: true }
    ];
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/status-bar/)
  - **Best practices:**
    - Use for system-level status indicators
    - Integrate with `SiBlinkService` for attention management
    - Support mute/unmute functionality
    - Group related status items

**Status Toggle**
  - Usage: Toggle status visualization with custom icons and states.
  - Angular usage:
    ```ts
    import { SiStatusToggleComponent } from '@siemens/element-ng/status-toggle';
    @Component({
      imports: [SiStatusToggleComponent]
    })
    ```
  - Template example:
    ```html
    <si-status-toggle
      [(value)]="isActive"
      [icon]="customIcon"
      [activeState]="'success'"
      [inactiveState]="'inactive'"
    ></si-status-toggle>
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/status-toggle/)
  - **Best practices:**
    - Use for binary status indicators
    - Provide custom icons for different states
    - Use semantic status colors
    - Make interactive when user can change status

**Status Counter**
  - Usage: Display counts with status indicators (formerly icon status).
  - Angular usage:
    ```ts
    import { SiStatusCounterComponent } from '@siemens/element-ng/status-counter';
    @Component({
      imports: [SiStatusCounterComponent]
    })
    ```
  - Template example:
    ```html
    <si-status-counter [count]="12" status="warning"></si-status-counter>
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/status-counter/)
  - **Best practices:**
    - Use for numerical status indicators
    - Combine with status colors for quick recognition
    - Keep counts visible and accessible
    - Update in real-time for dynamic data

**Summary Chip**
  - Usage: Compact status summary with optional selection.
  - Angular usage:
    ```ts
    import { SiSummaryChipComponent } from '@siemens/element-ng/summary-chip';
    @Component({
      imports: [SiSummaryChipComponent]
    })
    ```
  - Template example:
    ```html
    <si-summary-chip
      label="All"
      [value]="totalCount.toString()"
      [selected]="isSelected"
      (selectedChange)="onSelectionChange($event)"
    />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/summary-chip/)
  - **Best practices:**
    - Use for filter or category summaries
    - Support selection interaction
    - Display counts or metrics
    - Use with chip variants for visual distinction

**Summary Widget**
  - Usage: Display summary information with metrics and status.
  - Angular usage:
    ```ts
    import { SiSummaryWidgetComponent } from '@siemens/element-ng/summary-widget';
    @Component({
      imports: [SiSummaryWidgetComponent]
    })
    ```
  - Template example:
    ```html
    <si-summary-widget
      title="Active Users"
      [value]="1234"
      [trend]="5.2"
      status="success"
    />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/summary-widget/)
  - **Best practices:**
    - Use for dashboard KPIs and metrics
    - Show trends and comparisons
    - Use status colors for quick insights
    - Keep content focused and scannable

**Notification Item**
  - Usage: Individual notification with read/unread states and severity indicators.
  - Angular usage:
    ```ts
    import { SiNotificationItemComponent } from '@siemens/element-ng/notification-item';
    @Component({
      imports: [SiNotificationItemComponent]
    })
    ```
  - Template example:
    ```html
    <si-notification-item
      [title]="notification.title"
      [message]="notification.message"
      [read]="notification.read"
      [severity]="notification.severity"
      [timestamp]="notification.timestamp"
      (click)="markAsRead(notification)"
    />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/notification-item/)
  - **Best practices:**
    - Support read/unread states
    - Use severity levels (success, info, warning, danger, critical)
    - Include timestamps for context
    - Make actionable for navigation

**Inline Notification**
  - Usage: Non-blocking contextual messages within content areas.
  - Angular usage:
    ```ts
    import { SiInlineNotificationComponent } from '@siemens/element-ng/inline-notification';
    @Component({
      imports: [SiInlineNotificationComponent]
    })
    ```
  - Template example:
    ```html
    <si-inline-notification
      severity="info"
      message="System maintenance scheduled"
      [closable]="true"
    />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/inline-notification/)
  - **Best practices:**
    - Use for contextual, non-urgent messages
    - Support severity levels (info, warning, danger, critical)
    - Make dismissible when appropriate
    - Keep messages concise

**Badges**
  - Usage: Small status or count indicators.
  - Angular usage:
    ```ts
    import { SiBadgeComponent } from '@siemens/element-ng/badge';
    @Component({
      imports: [SiBadgeComponent]
    })
    ```
  - Template example:
    ```html
    <si-badge [count]="5" variant="danger"></si-badge>
    <si-badge label="New" variant="success"></si-badge>
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/badges/)
  - **Best practices:**
    - Use for counts or status labels
    - Support color variants for semantic meaning
    - Keep content minimal (numbers or short labels)
    - Position near related elements

**Avatar**
  - Usage: Display user profile images or initials with status indicators.
  - Angular usage:
    ```ts
    import { SiAvatarComponent } from '@siemens/element-ng/avatar';
    @Component({
      imports: [SiAvatarComponent]
    })
    ```
  - Template example:
    ```html
    <si-avatar
      [imageUrl]="user.avatarUrl"
      [altText]="user.name"
      [statusIcon]="{ icon: 'element-check', color: 'status-success' }"
    />
    <si-avatar [displayInitials]="'JD'" [color]="1" />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/avatar/)
  - **Best practices:**
    - Support images, icons, or initials
    - Use status indicators for online/offline state
    - Provide accessible alt text
    - Use color variants for visual distinction
    - Integrate with photo uploader for profile editing

**Icon**
  - Usage: Display Element Design System icons.
  - Angular usage:
    ```ts
    import { SiIconComponent } from '@siemens/element-ng/icon';
    @Component({
      imports: [SiIconComponent]
    })
    ```
  - Template example:
    ```html
    <si-icon [icon]="'element-check'" />
    <si-icon [icon]="'element-warning'" class="status-warning" />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/icon/)
  - **Best practices:**
    - Use Element icon names from official icon set
    - Always provide accessible labels or context
    - Use semantic colors for status icons
    - Combine with text for clarity

**Popover**
  - Usage: Display contextual content in an overlay.
  - Angular usage:
    ```ts
    import { SiPopoverComponent } from '@siemens/element-ng/popover';
    @Component({
      imports: [SiPopoverComponent]
    })
    ```
  - Template example:
    ```html
    <button [siPopover]="popoverContent">Show Details</button>
    <ng-template #popoverContent>
      <div>Detailed information...</div>
    </ng-template>
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/popover/)
  - **Best practices:**
    - Use for richer content than tooltips
    - Support dismissal with backdrop click
    - Position appropriately to avoid overflow
    - Keep content focused and scannable

**Empty State**
  - Usage: Indicate no data or empty state with helpful guidance.
  - Angular usage:
    ```ts
    import { SiEmptyStateComponent } from '@siemens/element-ng/empty-state';
    @Component({
      imports: [SiEmptyStateComponent]
    })
    ```
  - Template example:
    ```html
    <si-empty-state
      heading="No items found"
      message="Try adjusting your filters or create a new item"
      [actionLabel]="'Create Item'"
      (action)="createItem()"
    />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/empty-state/)
  - **Best practices:**
    - Use when data sets are empty
    - Provide actionable next steps
    - Use appropriate illustrations or icons
    - Keep messaging helpful and encouraging

**Connection Strength**
  - Usage: Display network or connection quality indicators.
  - Angular usage:
    ```ts
    import { SiConnectionStrengthComponent } from '@siemens/element-ng/connection-strength';
    @Component({
      imports: [SiConnectionStrengthComponent]
    })
    ```
  - Template example:
    ```html
    <si-connection-strength [strength]="signalStrength" />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/connection-strength/)
  - **Best practices:**
    - Use for IoT, network, or connectivity indicators
    - Update in real-time based on connection quality
    - Provide accessible labels for strength levels
    - Use semantic colors for quick recognition

**Copyright Notice**
  - Usage: Display copyright information in footer or legal sections.
  - Angular usage:
    ```ts
    import { SiCopyrightNoticeComponent } from '@siemens/element-ng/copyright-notice';
    @Component({
      imports: [SiCopyrightNoticeComponent]
    })
    ```
  - Template example:
    ```html
    <si-copyright-notice [year]="2025" company="Siemens AG" />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/copyright-notice/)
  - **Best practices:**
    - Place in application footer
    - Keep legally compliant
    - Use current year dynamically
    - Include required legal links

**System Banner**
  - Usage: Display system-wide announcements or critical messages.
  - Angular usage:
    ```ts
    import { SiSystemBannerComponent, ExtendedStatusType } from '@siemens/element-ng/system-banner';
    @Component({
      imports: [SiSystemBannerComponent]
    })
    ```
  - Template example:
    ```html
    <si-system-banner
      message="System is currently under maintenance"
      status="caution"
    />
    ```
  - [Docs](https://element.siemens.io/components/status-notifications/system-banner/)
  - **Best practices:**
    - Use for critical system-level messages
    - Support status types: info, success, warning, caution, danger, critical
    - Place at top of page for visibility
    - Use sparingly to avoid banner blindness

### Chat & Messaging

**Chat Container**
  - Usage: Container component for chat interfaces with scrollable message area.
  - Angular usage:
    ```ts
    import { SiChatContainerComponent } from '@siemens/element-ng/chat-messages';
    @Component({
      imports: [SiChatContainerComponent]
    })
    ```
  - Template example:
    ```html
    <si-chat-container>
      <!-- Chat messages go here -->
    </si-chat-container>
    ```
  - [Docs](https://element.siemens.io/components/chat-messages/)
  - **Best practices:**
    - Use as wrapper for all chat message components
    - Automatically handles scrolling to latest messages
    - Provides consistent spacing and layout
    - Integrate with loading states

**Chat Message**
  - Usage: Generic message component for custom chat message types.
  - Angular usage:
    ```ts
    import { SiChatMessageComponent, SiChatMessageActionDirective } from '@siemens/element-ng/chat-messages';
    @Component({
      imports: [SiChatMessageComponent, SiChatMessageActionDirective]
    })
    ```
  - Template example:
    ```html
    <si-chat-message [alignment]="'start'" [actionsPosition]="'side'">
      <si-avatar imageUrl="user.jpg" />
      <div>Message content</div>
      <button siChatMessageAction>Action</button>
    </si-chat-message>
    ```
  - [Docs](https://element.siemens.io/components/chat-messages/)
  - **Best practices:**
    - Use `alignment` for message positioning (start/end)
    - Use `actionsPosition` for action button placement (side/bottom)
    - Support loading state for streaming content
    - Include avatar and timestamp for context

**AI Message**
  - Usage: Display AI-generated responses with actions and loading states.
  - Angular usage:
    ```ts
    import { SiAiMessageComponent, MessageAction, MenuItem } from '@siemens/element-ng/chat-messages';
    @Component({
      imports: [SiAiMessageComponent]
    })
    ```
  - Template example:
    ```html
    <si-ai-message
      [content]="aiResponse"
      [loading]="isGenerating"
      [actions]="primaryActions"
      [secondaryActions]="menuActions"
    />
    ```
  - TypeScript example:
    ```ts
    primaryActions: MessageAction[] = [
      { label: 'Copy', icon: 'element-copy', action: () => this.copyMessage() },
      { label: 'Retry', icon: 'element-refresh', action: () => this.retry() }
    ];
    ```
  - [Docs](https://element.siemens.io/components/chat-messages/)
  - **Best practices:**
    - Show loading state during content generation
    - Provide copy, retry, and feedback actions
    - Support markdown rendering for rich content
    - Use secondary actions menu for less common operations

**User Message**
  - Usage: Display user-submitted messages with optional attachments.
  - Angular usage:
    ```ts
    import { SiUserMessageComponent } from '@siemens/element-ng/chat-messages';
    @Component({
      imports: [SiUserMessageComponent]
    })
    ```
  - Template example:
    ```html
    <si-user-message
      [content]="userInput"
      [avatar]="userAvatar"
      [timestamp]="messageTime"
    />
    ```
  - [Docs](https://element.siemens.io/components/chat-messages/)
  - **Best practices:**
    - Display user avatar for identification
    - Include timestamps for context
    - Support text and attachment display
    - Align to end (right) for user messages

**Chat Input**
  - Usage: Input component for composing and sending chat messages with attachments.
  - Angular usage:
    ```ts
    import { SiChatInputComponent, ChatInputAttachment, MessageAction } from '@siemens/element-ng/chat-messages';
    @Component({
      imports: [SiChatInputComponent]
    })
    ```
  - Template example:
    ```html
    <si-chat-input
      placeholder="Enter a message..."
      [actions]="inputActions"
      [secondaryActions]="secondaryActions"
      [allowAttachments]="true"
      [accept]="'image/*,.pdf,.doc,.docx'"
      [maxFileSize]="10485760"
      [sending]="isSending"
      [disabled]="isDisabled"
      [(value)]="messageText"
      [(attachments)]="files"
      (send)="sendMessage($event)"
      (interrupt)="stopGeneration()"
    />
    ```
  - TypeScript example:
    ```ts
    inputActions: MessageAction[] = [
      { label: 'Attach', icon: 'element-attachment', action: () => this.attachFile() },
      { label: 'Format', icon: 'element-brush', action: () => this.showFormatting() }
    ];
    ```
  - [Docs](https://element.siemens.io/components/chat-messages/)
  - **Best practices:**
    - Support file attachments with drag-and-drop
    - Provide primary and secondary actions
    - Show sending state during message submission
    - Support interrupt/stop functionality for AI generation
    - Include disclaimer text when needed
    - Use `autoGrow` for dynamic textarea expansion
    - Validate file types and sizes before upload

**Attachment List**
  - Usage: Display and manage file attachments in chat messages.
  - Angular usage:
    ```ts
    import { SiAttachmentListComponent, ChatInputAttachment } from '@siemens/element-ng/chat-messages';
    @Component({
      imports: [SiAttachmentListComponent]
    })
    ```
  - Template example:
    ```html
    <si-attachment-list
      [attachments]="messageAttachments"
      [editable]="true"
      (remove)="removeAttachment($event)"
    />
    ```
  - [Docs](https://element.siemens.io/components/chat-messages/)
  - **Best practices:**
    - Show file name, size, and type
    - Support preview for compatible file types
    - Allow removal when editable
    - Display upload progress when applicable
    - Handle file type icons appropriately

**Markdown Renderer**
  - Usage: Render markdown content in chat messages with syntax highlighting.
  - Angular usage:
    ```ts
    import { SiMarkdownRendererComponent } from '@siemens/element-ng/chat-messages';
    @Component({
      imports: [SiMarkdownRendererComponent]
    })
    ```
  - Template example:
    ```html
    <si-markdown-renderer [text]="markdownContent" />
    ```
  - [Docs](https://element.siemens.io/components/chat-messages/)
  - **Best practices:**
    - Use for AI-generated content with formatting
    - Support code syntax highlighting
    - Handle links and images securely
    - Sanitize content to prevent XSS

### Progress & Indication
**Progress Bar**
  - Usage: Show progress of a task or process.
  - Angular usage:
    ```ts
    import { SiProgressbarComponent } from '@siemens/element-ng/progressbar';
    @Component({
      imports: [SiProgressbarComponent]
    })
    ```
  - Template example:
    ```html
    <si-progressbar [value]="progressValue"></si-progressbar>
    ```
  - [Docs](https://element.siemens.io/components/progress-indication/progress-bar/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/progress-indication/progress-bar.md)
  - **Best practices:**
    - Use for determinate or indeterminate progress.
    - Provide accessible labels for screen readers.
    - Use color and animation to indicate status.

**Result Details List**
  - Usage: Show step-by-step results.
  - Angular usage:
    ```ts
    import { SiResultDetailsListComponent } from '@siemens/element-ng/result-details-list';
    @Component({
      imports: [SiResultDetailsListComponent]
    })
    ```
  - [Docs](https://element.siemens.io/components/progress-indication/result-details-list/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/progress-indication/result-details-list.md)
  - **Best practices:**
    - Use for multi-step processes or workflows.
    - Clearly indicate current and completed steps.

**Skeleton**
  - Usage: Loading placeholder.
  - Angular usage:
    ```ts
    import { SiSkeletonComponent } from '@siemens/element-ng/skeleton';
    @Component({
      imports: [SiSkeletonComponent]
    })
    ```
  - [Docs](https://element.siemens.io/components/progress-indication/skeleton/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/progress-indication/skeleton.md)
  - **Best practices:**
    - Use to indicate loading state for content.
    - Match skeleton shape to content being loaded.

**Spinner**
  - Usage: Loading indicator.
  - Angular usage:
    ```ts
    import { SiLoadingSpinnerComponent } from '@siemens/element-ng/loading-spinner';
    @Component({
      imports: [SiLoadingSpinnerComponent]
    })
    ```
  - Template example:
    ```html
    <si-loading-spinner></si-loading-spinner>
    ```
  - [Docs](https://element.siemens.io/components/progress-indication/spinner/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/progress-indication/spinner.md)
  - **Best practices:**
    - Use for short, indeterminate loading states.
    - Avoid using spinners for long operations; provide progress feedback instead.

### Sorting & Filtering
**Filter Bar**
  - Usage: Provide filtering options for lists or tables.
  - Angular usage:
    ```ts
    import { SiFilterBarComponent } from '@siemens/element-ng/filter-bar';
    @Component({
      imports: [SiFilterBarComponent]
    })
    ```
  - Template example:
    ```html
    <si-filter-bar [filters]="filters"></si-filter-bar>
    ```
  - [Docs](https://element.siemens.io/components/sorting-filtering/filter-bar/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/sorting-filtering/filter-bar.md)
  - **Best practices:**
    - Use for complex filtering scenarios.
    - Keep filter options clear and concise.

**Filter Pills**
  - Usage: Show active filters as removable pills.
  - Angular usage:
    ```ts
    import { SiFilterPillsComponent } from '@siemens/element-ng/filter-pills';
    @Component({
      imports: [SiFilterPillsComponent]
    })
    ```
  - Template example:
    ```html
    <si-filter-pills [filters]="activeFilters"></si-filter-pills>
    ```
  - [Docs](https://element.siemens.io/components/sorting-filtering/filter-pills/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/sorting-filtering/filter-pills.md)
  - **Best practices:**
    - Use to display and remove active filters.
    - Ensure pills are accessible and clearly labeled.

**Filtered Search**
  - Usage: Search input with filter options.
  - Angular usage:
    ```ts
    import { SiFilteredSearchComponent } from '@siemens/element-ng/filtered-search';
    @Component({
      imports: [SiFilteredSearchComponent]
    })
    ```
  - Template example:
    ```html
    <si-filtered-search [filters]="filters"></si-filtered-search>
    ```
  - [Docs](https://element.siemens.io/components/sorting-filtering/filtered-search/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/sorting-filtering/filtered-search.md)
  - **Best practices:**
    - Use for search scenarios with multiple filter options.
    - Provide clear feedback on active filters.

**Search Bar**
  - Usage: Simple search input for lists or tables.
  - Angular usage:
    ```ts
    import { SiSearchBarComponent } from '@siemens/element-ng/search-bar';
    @Component({
      imports: [SiSearchBarComponent]
    })
    ```
  - Template example:
    ```html
    <si-search-bar [(ngModel)]="searchTerm"></si-search-bar>
    ```
  - [Docs](https://element.siemens.io/components/sorting-filtering/search-bar/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/sorting-filtering/search-bar.md)
  - **Best practices:**
    - Use for simple search scenarios.
    - Provide placeholder text for guidance.

**Sort Bar**
  - Usage: Provide sorting options for lists or tables.
  - Angular usage:
    ```ts
    import { SiSortBarComponent } from '@siemens/element-ng/sort-bar';
    @Component({
      imports: [SiSortBarComponent]
    })
    ```
  - Template example:
    ```html
    <si-sort-bar [sortOptions]="sortOptions"></si-sort-bar>
    ```
  - [Docs](https://element.siemens.io/components/sorting-filtering/sort-bar/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/sorting-filtering/sort-bar.md)
  - **Best practices:**
    - Use for sortable data sets.
    - Keep sort options clear and relevant.

**Typeahead**
  - Usage: Autocomplete input for searching and selecting options.
  - Angular usage:
    ```ts
    import { SiTypeaheadComponent } from '@siemens/element-ng/typeahead';
    @Component({
      imports: [SiTypeaheadComponent]
    })
    ```
  - Template example:
    ```html
    <si-typeahead [options]="options" [(ngModel)]="selected"></si-typeahead>
    ```
  - [Docs](https://element.siemens.io/components/sorting-filtering/typeahead/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/sorting-filtering/typeahead.md)
  - **Best practices:**
    - Use for large option sets where typing is faster than scrolling.
    - Ensure accessibility and keyboard navigation.

### Charts & Data Visualization
- Bar Chart
- Circle Chart
- Gauge Chart
- Generic Chart
- Line Chart
- Micro Charts
- Progress Chart
- Scatter Chart

**Bar Chart**
  - Usage: Visualize categorical data as horizontal or vertical bars.
  - Angular usage:
    ```ts
    import { SiBarChartComponent } from '@siemens/native-charts-ng/bar-chart';
    @Component({
      imports: [SiBarChartComponent]
    })
    ```
  - Template example:
    ```html
    <si-bar-chart [data]="barChartData"></si-bar-chart>
    ```
  - [Docs](https://element.siemens.io/components/charts/bar-chart/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/charts/bar-chart.md)
  - **Best practices:**
    - Use for comparing values across categories.
    - Label axes and bars clearly.

**Circle Chart**
  - Usage: Show proportions as segments of a circle (pie/donut chart).
  - Angular usage:
    ```ts
    import { SiCircleChartComponent } from '@siemens/native-charts-ng/circle-chart';
    @Component({
      imports: [SiCircleChartComponent]
    })
    ```
  - Template example:
    ```html
    <si-circle-chart [data]="circleChartData"></si-circle-chart>
    ```
  - [Docs](https://element.siemens.io/components/charts/circle-chart/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/charts/circle-chart.md)
  - **Best practices:**
    - Use for showing parts of a whole.
    - Limit the number of segments for clarity.

**Gauge Chart**
  - Usage: Display a value within a range, like a speedometer.
  - Angular usage:
    ```ts
    import { SiGaugeChartComponent } from '@siemens/native-charts-ng/gauge-chart';
    @Component({
      imports: [SiGaugeChartComponent]
    })
    ```
  - Template example:
    ```html
    <si-gauge-chart [value]="gaugeValue"></si-gauge-chart>
    ```
  - [Docs](https://element.siemens.io/components/charts/gauge-chart/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/charts/gauge-chart.md)
  - **Best practices:**
    - Use for single values within a range.
    - Clearly indicate min, max, and current value.

**Generic Chart**
  - Usage: Flexible chart for custom data visualizations.
  - Angular usage:
    ```ts
    import { SiGenericChartComponent } from '@siemens/native-charts-ng/generic-chart';
    @Component({
      imports: [SiGenericChartComponent]
    })
    ```
  - Template example:
    ```html
    <si-generic-chart [data]="genericChartData"></si-generic-chart>
    ```
  - [Docs](https://element.siemens.io/components/charts/generic-chart/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/charts/generic-chart.md)
  - **Best practices:**
    - Use for advanced or custom charting needs.
    - Ensure accessibility and clear legends.

**Line Chart**
  - Usage: Show trends over time or ordered categories.
  - Angular usage:
    ```ts
    import { SiLineChartComponent } from '@siemens/native-charts-ng/line-chart';
    @Component({
      imports: [SiLineChartComponent]
    })
    ```
  - Template example:
    ```html
    <si-line-chart [data]="lineChartData"></si-line-chart>
    ```
  - [Docs](https://element.siemens.io/components/charts/line-chart/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/charts/line-chart.md)
  - **Best practices:**
    - Use for time series or continuous data.
    - Label axes and data points.

**Micro Charts**
  - Usage: Small, inline charts for sparklines or compact data.
  - Angular usage:
    ```ts
    import { SiMicrochartBarComponent, SiMicrochartLineComponent, SiMicrochartDonutComponent, SiMicrochartProgressComponent } from '@siemens/native-charts-ng';
    @Component({
      imports: [SiMicrochartBarComponent, SiMicrochartLineComponent, SiMicrochartDonutComponent, SiMicrochartProgressComponent]
    })
    ```
  - Template example:
    ```html
    <si-microchart-bar [data]="microBarData"></si-microchart-bar>
    <si-microchart-line [data]="microLineData"></si-microchart-line>
    <si-microchart-donut [data]="microDonutData"></si-microchart-donut>
    <si-microchart-progress [value]="progressValue"></si-microchart-progress>
    ```
  - [Docs](https://element.siemens.io/components/charts/micro-charts/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/charts/micro-charts.md)
  - **Best practices:**
    - Use for compact, inline data visualizations.
    - Keep micro charts simple and clear.

**Progress Chart**
  - Usage: Visualize progress as a chart (e.g., radial or bar progress).
  - Angular usage:
    ```ts
    import { SiProgressChartComponent } from '@siemens/native-charts-ng/progress-chart';
    @Component({
      imports: [SiProgressChartComponent]
    })
    ```
  - Template example:
    ```html
    <si-progress-chart [value]="progressValue"></si-progress-chart>
    ```
  - [Docs](https://element.siemens.io/components/charts/progress-chart/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/charts/progress-chart.md)
  - **Best practices:**
    - Use for showing completion or status.
    - Clearly indicate progress and thresholds.

**Scatter Chart**
  - Usage: Show relationships between two variables as points.
  - Angular usage:
    ```ts
    import { SiScatterChartComponent } from '@siemens/native-charts-ng/scatter-chart';
    @Component({
      imports: [SiScatterChartComponent]
    })
    ```
  - Template example:
    ```html
    <si-scatter-chart [data]="scatterChartData"></si-scatter-chart>
    ```
  - [Docs](https://element.siemens.io/components/charts/scatter-chart/)
  - [API](https://github.com/siemens/element/blob/main/docs/components/charts/scatter-chart.md)
  - **Best practices:**
    - Use for visualizing correlation or distribution.
    - Label axes and provide tooltips for clarity.

### Pages & Patterns

**About Page**
  - Usage: Provides information about the application, version, and legal notices.
  - Angular usage:
    ```ts
    import { SiAboutComponent } from '@siemens/element-ng/about';
    @Component({
      imports: [SiAboutComponent]
    })
    ```
  - Template example:
    ```html
    <si-about
      [version]="appVersion"
      [buildNumber]="buildNumber"
      [copyrightDetails]="copyrightInfo"
    />
    ```
  - [Docs](https://element.siemens.io/components/pages/about/)
  - **Best practices:**
    - Display application version and build information
    - Include copyright and legal notices
    - Use official layout and typography components
    - Keep content concise and up to date

**Info Page**
  - Usage: Display detailed information or documentation to users.
  - Angular usage:
    ```ts
    import { SiInfoPageComponent } from '@siemens/element-ng/info-page';
    @Component({
      imports: [SiInfoPageComponent]
    })
    ```
  - Template example:
    ```html
    <si-info-page
      heading="Information"
      [links]="relatedLinks"
    >
      <p>Details about this feature...</p>
    </si-info-page>
    ```
  - [Docs](https://element.siemens.io/components/pages/info-page/)
  - **Best practices:**
    - Use clear headings and sections
    - Provide links to related resources
    - Structure content with cards and typography
    - Make content scannable and accessible

**Landing Page**
  - Usage: Entry point for the application with authentication and branding.
  - Angular usage:
    ```ts
    import { SiLandingPageComponent } from '@siemens/element-ng/landing-page';
    @Component({
      imports: [SiLandingPageComponent]
    })
    ```
  - Template example:
    ```html
    <si-landing-page
      heading="Element App"
      subtitle="APP.CLAIM"
      [backgroundImageUrl]="'./assets/images/background.webp'"
      [logoUrl]="'./assets/images/logo.svg'"
      [copyrightDetails]="copyrightInfo"
      [links]="footerLinks"
      [availableLanguages]="['en', 'de', 'fr']"
      [announcement]="systemAnnouncement"
      [loginAlert]="loginError"
    >
      <form>
        <!-- Login form content -->
      </form>
    </si-landing-page>
    ```
  - [Docs](https://element.siemens.io/components/pages/landing-page/)
  - **Best practices:**
    - Use for authentication and welcome screens
    - Support multiple languages with language switcher
    - Include copyright and legal links
    - Display system announcements when needed
    - Provide background imagery for branding
    - Highlight primary actions and navigation

**Unauthorized Page**
  - Usage: Shown when a user lacks permission to access a resource.
  - Angular usage:
    ```ts
    import { SiUnauthorizedPageComponent } from '@siemens/element-ng/unauthorized-page';
    @Component({
      imports: [SiUnauthorizedPageComponent]
    })
    ```
  - Template example:
    ```html
    <si-unauthorized-page
      heading="Unauthorized"
      message="You do not have access to this page."
      [actionLabel]="'Go Back'"
      (action)="navigateBack()"
    />
    ```
  - [Docs](https://element.siemens.io/components/pages/unauthorized-page/)
  - **Best practices:**
    - Provide clear messaging about access restrictions
    - Offer navigation options to accessible areas
    - Use appropriate icons for visual context
    - Keep messaging helpful, not punitive

**Maps**
  - Usage: Display geospatial data or locations.
  - Angular usage: Integrate with third-party map libraries inside Element layout components.
  - Template example:
    ```html
    <si-card>
      <div id="map-container"></div>
    </si-card>
    ```
  - [Pattern Docs](https://element.siemens.io/patterns/maps/)
  - **Best practices:**
    - Ensure maps are accessible and responsive.
    - Use overlays and markers for clarity.

**Backdrop**
  - Usage: Dim background to focus user attention (e.g., during modals).
  - Angular usage: Use the backdrop utility or overlay service.
  - Template example:
    ```html
    <si-backdrop [open]="isOpen"></si-backdrop>
    ```
  - [Pattern Docs](https://element.siemens.io/patterns/backdrop/)
  - **Best practices:**
    - Use for modal dialogs or loading states.
    - Ensure accessibility for screen readers.

**Drag & Drop**
  - Usage: Enable users to move or reorder items.
  - Angular usage: Use Element drag & drop directives or integrate with Angular CDK.
  - Template example:
    ```html
    <si-list-group siDraggable>
      <si-list-group-item *ngFor="let item of items">{{ item }}</si-list-group-item>
    </si-list-group>
    ```
  - [Pattern Docs](https://element.siemens.io/patterns/drag-drop/)
  - **Best practices:**
    - Provide visual feedback during drag.
    - Support keyboard accessibility.

**Loading**
  - Usage: Indicate loading state for content or actions.
  - Angular usage: Use Spinner, Skeleton, or Backdrop components.
  - Template example:
    ```html
    <si-loading-spinner *ngIf="isLoading"></si-loading-spinner>
    <si-skeleton *ngIf="isLoading"></si-skeleton>
    ```
  - [Pattern Docs](https://element.siemens.io/patterns/loading/)
  - **Best practices:**
    - Use appropriate indicators for the context.
    - Avoid blocking the UI unnecessarily.

**Notifications**
  - Usage: Show system or user feedback messages.
  - Angular usage: Use Toast Notification or Alert components.
  - Template example:
    ```ts
    this.toastService.show('Saved!', { type: 'success' });
    ```
  - [Pattern Docs](https://element.siemens.io/patterns/notifications/)
  - **Best practices:**
    - Use for important, actionable feedback.
    - Keep messages concise.

**Filter**
  - Usage: Provide filtering options for data sets.
  - Angular usage: Use Filter Bar, Filter Pills, or custom filter components.
  - Template example:
    ```html
    <si-filter-bar [filters]="filters"></si-filter-bar>
    ```
  - [Pattern Docs](https://element.siemens.io/patterns/filter/)
  - **Best practices:**
    - Make filters clear and easy to use.
    - Provide feedback on active filters.

**Help**
  - Usage: Offer contextual help or documentation links.
  - Angular usage: Use Help Button, Tooltip, or dedicated help sections.
  - Template example:
    ```html
    <si-help-button label="Help"></si-help-button>
    <button siTooltip="More info">?</button>
    ```
  - [Pattern Docs](https://element.siemens.io/patterns/help/)
  - **Best practices:**
    - Make help easily discoverable.
    - Use accessible labels and links.

**AI Chat**
  - Usage: Integrate conversational AI for user support or automation.
  - Angular usage: Embed chat UI in a card or side panel; integrate with backend AI service.
  - Template example:
    ```html
    <si-card>
      <app-ai-chat></app-ai-chat>
    </si-card>
    ```
  - [Pattern Docs](https://element.siemens.io/patterns/ai-chat/)
  - **Best practices:**
    - Ensure privacy and security for user data.
    - Provide clear entry points for chat.

---

## 3. Usage & Implementation Notes
- **Always use the official component for each UI element.**
- **Do not override default styles** unless explicitly required by the design system.
- **Follow accessibility and localization best practices** as per Element documentation.
- **Reference the [Element API docs](https://element.siemens.io/api/siemens/element-ng/components/) for component usage and properties.**

---

## 4. Additional Resources
- [Element Design System Overview](https://element.siemens.io/)
- [Get Started Guide](https://element.siemens.io/get-started/quickstart/)
- [Patterns](https://element.siemens.io/patterns/)
- [CSS Framework](https://element.siemens.io/architecture/css-framework/)
- [Theming](https://element.siemens.io/architecture/theming/)

---

**MIT License applies.**

---

*This file is intended for GHCP and UI automation to ensure strict adherence to the Siemens Element Design System. For detailed component usage, always refer to the official documentation links above.*
