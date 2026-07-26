# SAP Starter Kit — TestForge AI Premium Pack v1.0.0
# Verified against S/4HANA 2026

Feature: SAP Starter Kit

  @P1 @positive @Asset-Accounting
  Scenario: Retire asset ABAON
    Given Asset exists with value
    Given retirement GL accounts configured
    When ABAON → Enter asset
    And Partial/full retirement
    And Revenue amount
    And Post
    Then Asset cleared
    And gain/loss posted
    And removed from BS at NBV

  @P1 @positive @PC
  Scenario: Preliminary Costing PCC
    Given Product Cost Collector exists
    When KKF6N
    And Trigger preliminary costing
    And Save
    Then Preliminary cost estimate updated for repetitive manufacturing

  @P1 @positive @Invoice-Verification
  Scenario: MIRO invoice with 3-way match
    Given PO + GR exists
    Given vendor invoice received
    When MIRO → Enter PO reference
    And System proposes GR quantity and price
    And Enter vendor invoice number
    And Check discrepancies
    And Post
    Then Invoice posted
    And GR/IR cleared
    And if price variance > tolerance → blocked for payment automatically

  @P1 @positive @Negative-Test
  Scenario: Create order for blocked customer
    Given Customer blocked in FD32
    When VA01 Enter blocked customer
    And Order entry
    Then Order blocked immediately
    And credit block reason
    And no delivery possible until released

  @P1 @positive @Negative-Test
  Scenario: Attempt component GI for unreleased order
    Given Production order in CRTD status
    Given not released
    When MIGO GI to production order
    And Order not released
    Then Error: order not released
    And GI rejected
    And order must be in REL status

  @P1 @positive @Batch-Release
  Scenario: QA11 with 21 CFR 11
    Given Lot pending
    When QA11
    And Accept UD
    And Sign
    Then Usage decision posted compliant with digital signature audit rules

  @P1 @positive @Equipment
  Scenario: Dismantle equipment from functional location
    Given Equipment installed on FL
    Given dismantling auth
    When IE02 → Dismantle from FL.
    And Set date.
    And Save.
    Then Equipment removed from FL
    And installation history updated

  @P1 @integration @PY
  Scenario: Post to Accounting
    Given Payroll run completed
    When PC00_M99_CIPC
    And Create posting run
    And Post
    Then FI/CO documents generated reflecting salary expenses

  @P1 @positive @Project-System
  Scenario: Copy project template to new project CJ01
    Given Template project exists
    Given target project ID ready
    When CJ01 → Copy from template.
    And Adjust WBS IDs.
    And Set dates.
    And Save.
    Then New project created with WBS, network, and structure from template

  @P1 @positive @Warehouse-Management
  Scenario: Confirm TO after physical pick LT12
    Given TO created
    Given physical pick complete
    When LT12 → Enter TO number.
    And Confirm quantities.
    And Post.
    Then TO confirmed
    And bin stocks updated
    And delivery ready for GI

  @P1 @integration @MFS
  Scenario: Conveyor Routing
    Given MFS configured
    When Create HU task to conveyor
    And Send telegram
    Then Telegram sent to PLC, HU routed automatically

  @P1 @positive @Transport
  Scenario: Create and release transport request SE09
    Given Development system
    Given transport route
    When SE09 Workbench transport
    And Assign objects
    And Release task
    And Release request
    Then Request released
    And ready for import to QAS
    And objects locked in DEV
    And log created

  @P1 @integration @TM/EWM
  Scenario: Freight Order to EWM
    Given FO created in TM
    When Create FO in TM
    And Assign deliveries
    Then EWM receives FO data without generating a TU (ASR mode)

  @P1 @integration @EWM/TM
  Scenario: Multi-Pick/Multi-Drop FO
    Given ASR configured
    When Create FO with 2 loading points
    And Check EWM
    Then One FO triggers tasks across multiple EWM warehouses

  @P1 @integration @Export
  Scenario: Legal Control Check on Sales Order
    Given SO created with controlled product
    When Create SO in S/4
    And Transfer to GTS
    And Legal control check
    Then SO blocked due to missing export license

  @P1 @positive @Convergent-Invoicing
  Scenario: Execute Billing & Invoicing Run
    Given Billable items exist
    When FKKBIX_BILL (Billing)
    And FKKINV_INV (Invoicing)
    Then Invoice created, FI-CA document posted

  @P1 @positive @Billing
  Scenario: Bill patient case
    Given Patient discharged
    When NA01 / NLB1
    And Enter Case ID
    And Execute
    Then Invoice generated for insurance provider or patient

  @P1 @positive @Billing
  Scenario: Execute Billing
    Given Meter reading exists
    When EASIBI / EA10
    And Execute
    Then Utility bill generated based on consumed volume

  @P1 @positive @Replenishment
  Scenario: Run Store Replenishment
    Given Sales history exists
    When WRP1
    And Enter Store/Article
    And Run
    Then Purchase requisitions or STOs generated for stores

  @P1 @integration @JIT/JIS
  Scenario: Receive JIT Call
    Given JIT scheduling active
    When JITM
    And Monitor inbound EDI
    Then JIT call created automatically from customer EDI message

  @P1 @positive @Loans-Mgmt
  Scenario: Create Mortgage Loan
    Given Business Partner (FS-BP) exists
    When FN1M
    And Enter product type
    And Save
    Then Loan contract created and registered in Loans Management

  @P1 @integration @Discrete-Manufacturing
  Scenario: Produce variant-configured product
    Given Variant configuration active
    Given SO with configuration
    When Create SO with configuration.
    And MRP creates planned order.
    And Produce configured product.
    Then Correct variant produced per SO configuration
    And BOM exploded per variant

  @P1 @integration @Oil-&-Gas
  Scenario: Allocate joint venture costs to partners
    Given JVA module active
    Given partners and percentages configured
    When Post joint venture costs.
    And Run JVA allocation.
    And Invoice partners.
    Then Costs allocated to JV partners per ownership percentage
    And partner invoices created

  @P2 @positive @In-House-Cash
  Scenario: Process IHC Payment
    Given IHC routing setup
    When IHC0
    And Enter payment order
    And Post
    Then IHC internal payment order processed through central clearing

  @P1 @positive @MDG
  Scenario: Create BP via Change Request
    Given MDG active
    When NWBC
    And Create BP Change Request
    And Submit
    Then CR routed for approval
    And BP inactive until approved

  @P1 @positive @Grants-Mgmt
  Scenario: Create Grant Master
    Given Sponsor exists
    When GMGRANT01
    And Enter details
    Then Grant master created and activated for budget allocations

  @P1 @positive @Accounts-Payable
  Scenario: Post Vendor Invoice MIRO/FB60
    Given Vendor master exists
    Given AP account configured
    Given PO with GR (for MIRO)
    When MIRO → Enter PO number
    And Check GR/IR match
    And Enter vendor invoice number
    And Check amounts
    And Post
    Then Vendor invoice posted
    And PO history updated
    And GR/IR account cleared
    And open item in AP

  @P1 @positive @PA
  Scenario: Realignment Run
    Given Organizational changes made
    When KEND
    And Define realignment
    And Execute
    Then Historical COPA documents updated with new hierarchy parameters

  @P1 @positive @Invoice-Verification
  Scenario: Post subsequent debit or credit for price
    Given Original invoice posted
    Given price adjustment received
    When MIRO → Subsequent debit/credit.
    And Enter adjustment.
    And Post.
    Then Price adjustment posted
    And stock or expense account updated

  @P1 @integration @Interco
  Scenario: Advanced Intercompany Sales
    Given VCM configured
    When Create SO in Selling Co.
    And Save
    Then VCM auto-creates Intercompany PO and Delivering Co. SO

  @P1 @positive @Backflush
  Scenario: Backflush MFBF for repetitive manufacturing
    Given Repetitive manufacturing profile
    Given production line
    Given rate routing
    When MFBF Production line
    And Finished qty
    And Post backflush
    Then Components auto-consumed 261
    And FG received 101
    And no manual GI GR needed

  @P1 @integration @Calibration
  Scenario: Create calibration order for equipment IP10
    Given Equipment with calibration task list
    When IP10 → Create order.
    And Assign equipment.
    And Schedule.
    And Confirm.
    Then Calibration order created
    And equipment blocked during
    And released after

  @P1 @positive @Performance
  Scenario: Run MTTR and MTBF analysis from PM data
    Given PM notifications and orders with confirmed times
    When Run PM analysis report.
    And Filter by equipment.
    And Review MTTR/MTBF.
    Then MTTR and MTBF calculated from actual notification data

  @P1 @integration @SF-EC
  Scenario: Replicate Employee Master
    Given BTP CPI configured
    When Hire employee in SF EC
    And Monitor CPI
    Then Employee BP created in S/4HANA automatically

  @P1 @integration @WBS
  Scenario: Actual Posting to WBS
    Given WBS released
    When FB50
    And Enter expense amount
    And Assign WBS as cost object
    And Post
    Then Actual costs reflected on WBS
    And budget consumption updated

  @P1 @positive @Replenish
  Scenario: Automatic Bin Replenishment
    Given Fixed bin stock < Min
    When Post GI dropping stock below Min
    And Check WT
    Then Replenishment Warehouse Task automatically created

  @P1 @positive @Performance
  Scenario: 100 concurrent users running SD MM transactions
    Given Productive system
    Given test environment
    When Load test tool 100 users
    And Mix of VA01 ME21N VF01 MIGO
    And Monitor SM50 ST05
    Then Response time under 3 seconds for all TCs at 100 users
    And no WP shortdumps
    And DB normal

  @P1 @integration @TM/EWM
  Scenario: Ready for WH Processing
    Given FO sent
    When TM dispatcher sets status "Ready for WH processing"
    Then Block removed in EWM
    And warehouse tasks can be created

  @P1 @integration @Freight
  Scenario: Create Freight Settlement
    Given Freight Order executed
    When Open FO
    And Generate FSD
    And Post to MM
    Then FSD posted
    And Service PO and SES automatically created

  @P1 @integration @Compliance
  Scenario: SPL Screening of Business Partner
    Given BP created in S/4HANA
    When Transfer BP to GTS
    And Execute SPL check
    And View log
    Then BP blocked or released based on SPL master
