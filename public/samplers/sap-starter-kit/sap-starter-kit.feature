# SAP Starter Kit — TestForge AI Premium Pack v1.0.0
# Written against S/4HANA 2026 — not yet sandbox-verified

Feature: SAP Starter Kit

  @P1 @positive @Credit-Management
  Scenario: FI-AR credit exposure UKM
    Given UKM (SAP Credit Management) active
    Given customer credit segments defined
    When UKM_CASE → Open credit case
    And Review exposure (open orders + open AR)
    And Credit decision
    And Update credit limit
    Then Exposure calculated correctly
    And credit decisions logged
    And breach of limit blocks orders automatically

  @P1 @positive @PC
  Scenario: Preliminary Costing PCC
    Given Product Cost Collector exists
    When KKF6N
    And Trigger preliminary costing
    And Save
    Then Preliminary cost estimate updated for repetitive manufacturing

  @P1 @integration @FI-MM-Integration
  Scenario: Verify FI posting on MIGO GR
    Given Material master price
    Given GR movement type 101
    When ME21N PO
    And MIGO GR
    And MR03 Material document
    And FBL3N FI line items
    Then GR/IR account credited
    And stock account debited
    And amounts match PO price
    And CO doc created

  @P1 @integration @FI-SD-Integration
  Scenario: Verify FI revenue on billing VFX3
    Given Billing document
    Given revenue account determination
    When VF01 Customer invoice
    And VFX3 Billing doc
    And FB03 FI document
    Then Revenue account credited
    And customer AR debited
    And tax posted
    And COPA entry created

  @P1 @integration @Plan-to-Produce
  Scenario: Complete P2P flow MD01→CO01→CO11N→MIGO→CO88
    Given BOM
    Given routing
    Given work centers
    Given MRP active
    Given material master
    When MD01 → Run MRP for plant
    And CO40 → Convert planned order
    And CO02 → Release production order
    And MIGO 261 → Issue components
    And CO11N → Confirm operations
    And MIGO 101 → Receive finished goods
    And CO88 → Settle order
    Then FG in stock
    And production costs settled
    And variance < tolerance
    And order status TECO and SETC
    And FI balanced

  @P1 @positive @Quality
  Scenario: Inspection at production operation
    Given Inspection type 03 (in-process) active
    Given inspection plan at routing operation
    When Trigger inspection at operation CO11N
    And QE11 → Record results
    And Defect recording
    And Rework order if needed
    Then In-process inspection recorded
    And defect triggers rework
    And quality gate prevents downstream operation if failed

  @P1 @positive @Maintenance
  Scenario: Functional location inspection IP10
    Given FLOC with SIL classification
    Given maintenance strategy
    When IP10 Maintenance plan for FLOC
    And IP30 Schedule plan
    And Inspection work order
    And Complete with measurement doc
    Then Safety inspection completed on schedule
    And proof test results documented
    And SIL maintained

  @P1 @positive @Benefits
  Scenario: Enroll employee in health benefit plan
    Given Benefit plan configured
    Given IT0168 available
    When IT0168 → Enroll employee.
    And Select plan.
    And Enter coverage.
    And Save.
    Then Enrollment created
    And premium deduction added to payroll

  @P1 @positive @Project-System
  Scenario: Create project network CJ20N
    Given Project definition exists
    Given network type
    Given work center
    When CJ20N Create network
    And Activities + milestones
    And Relationships FS SS FF
    And Schedule
    And Release
    Then Critical path calculated
    And network scheduled
    And resource leveling optional
    And costs planned

  @P1 @positive @Warehouse-Management
  Scenario: Execute physical inventory count in WM LI01
    Given WH configured
    Given stock in bins
    When LI01 → Create count document.
    And LI11 → Enter count.
    And LI20 → Post differences.
    Then Count document completed
    And differences posted
    And bin stocks corrected

  @P1 @integration @MFS
  Scenario: Conveyor Routing
    Given MFS configured
    When Create HU task to conveyor
    And Send telegram
    Then Telegram sent to PLC, HU routed automatically

  @P1 @positive @CTS
  Scenario: Create and release transport CTS SE10
    Given SAP system with workbench org
    Given transport route configured
    When SE10 → Create task.
    And Assign objects.
    And Release task.
    And Release request.
    Then Transport request created
    And objects assigned
    And released for import

  @P1 @positive @Automation
  Scenario: Automate master data creation via eCATT
    Given eCATT configured
    Given test script created
    When Execute eCATT script for GL/vendor/material.
    And Review log.
    And Validate records.
    Then Master data created via eCATT
    And no manual steps
    And reusable for regression

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

  @P1 @positive @Patient-Management
  Scenario: Admit patient IS-H NPA1
    Given IS-H (Industry Solution Healthcare) configured
    Given ward/bed available
    When NPA1 → Patient admission
    And Search/create patient master
    And Select ward + bed
    And Enter diagnosis
    And Confirm insurance
    Then Patient admitted
    And bed occupied
    And insurance verified
    And case created
    And cost object (case) for billing

  @P1 @positive @Device-Management
  Scenario: Create and dispatch meter reading order EL26
    Given IS-U configured
    Given device
    Given installation
    When EL26 Reading order for route
    And Export to mobile
    And Import readings
    And Plausibility check
    Then Readings imported
    And estimates for missed meters
    And billing triggered after import

  @P1 @integration @POS-Inbound
  Scenario: Process POS Inbound Sales
    Given WPUBON IDoc exists
    When WPER
    And Monitor IDoc processing
    Then Revenue posted to CO-PA
    And inventory reduced systematically

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

  @P1 @positive @Serialization
  Scenario: Validate DSCSA serialization on outbound shipment
    Given Serialization active
    Given serial numbers assigned to batch
    When Create delivery.
    And Verify serial numbers on each saleable unit.
    And Transmit EPCIS.
    Then Serial numbers verified
    And EPCIS event transmitted
    And DSCSA compliance confirmed

  @P1 @integration @Discrete-Manufacturing
  Scenario: Produce variant-configured product
    Given Variant configuration active
    Given SO with configuration
    When Create SO with configuration.
    And MRP creates planned order.
    And Produce configured product.
    Then Correct variant produced per SO configuration
    And BOM exploded per variant

  @P1 @integration @Promotion
  Scenario: Activate promotional price for article
    Given Promotion type configured
    Given article and validity dates set
    When Create promotion.
    And Set promotional price.
    And Activate.
    And Test POS price.
    Then Promotional price active in POS during validity period
    And reverting after end

  @P1 @positive @Treasury
  Scenario: Create money market transaction in SAP Treasury
    Given Treasury module active
    Given house bank configured
    When TM02 → Create MM deal.
    And Enter counterparty and rates.
    And Confirm.
    Then Money market deal created
    And cash flow generated
    And settlement scheduled

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

  @P1 @positive @FSCM
  Scenario: SAP Collections Management
    Given FIN-FSCM-COL active
    Given customer segments
    Given credit analyst assigned
    When F_UKM_COLL_AUTO → Generate worklist
    And Analyst reviews overdue customers
    And Create contact
    And Promise to pay
    Then Worklist generated by risk
    And contact logged
    And promise-to-pay created
    And escalation on broken promise

  @P1 @positive @PA
  Scenario: Realignment Run
    Given Organizational changes made
    When KEND
    And Define realignment
    And Execute
    Then Historical COPA documents updated with new hierarchy parameters

  @P1 @integration @Procure-to-Pay
  Scenario: Complete P2P flow PR→PO→GR→MIRO→F110
    Given Vendor master
    Given material master
    Given GL accounts
    Given bank
    Given all authorizations
    When ME51N → Create PR
    And Approve PR (workflow)
    And ME21N → Create PO referencing PR
    And MIGO → Post GR against PO
    And MIRO → Post vendor invoice (3-way match)
    And F110 → Payment run
    And Verify vendor balance = 0
    Then P2P cycle complete
    And no open items
    And vendor paid
    And audit trail from PR through payment
    And FI balanced

  @P1 @integration @Order-to-Cash
  Scenario: Complete O2C flow VA01→VL01N→VF01→FI
    Given Customer master
    Given material in stock
    Given pricing
    Given billing
    Given bank
    When VA01 → Create standard sales order OR
    And VL01N → Create outbound delivery
    And VL02N → Post goods issue
    And VF01 → Create invoice
    And F-28 → Post incoming payment
    And Verify customer balance = 0
    Then O2C cycle complete
    And stock reduced
    And revenue recognized
    And customer paid
    And FI balanced
    And no open items

  @P1 @integration @PP-MM-Integration
  Scenario: Verify MM reservation on PO release
    Given Production order released
    Given components in BOM
    When CO02 Release order
    And MB25 Reservations
    And MB54 Reservation list
    Then Component reservations created
    And qty reserved in plant
    And MRP respects reservation

  @P1 @positive @Quality
  Scenario: GMP batch release inspection lot QA11
    Given Batch received
    Given inspection lot triggered
    Given inspection plan with pharma characteristics
    When QA11 → Usage decision on inspection lot
    And Attach CoA
    And QA decision = Accept (Code A)
    And Stock posts to unrestricted
    Then Batch released for distribution
    And stock status changes
    And batch classification updated with UD date
    And audit trail per 21 CFR Part 11

  @P1 @positive @Maintenance
  Scenario: Preventive maintenance for SIL-rated equipment
    Given Equipment with SIL classification
    Given preventive maintenance plan configured
    When IP10 → Maintenance plan for safety valve
    And IP30 → Schedule plan
    And Proof test work order created automatically
    And Complete with measurement
    Then Proof test completed
    And functional test result recorded
    And equipment effectiveness calculated
    And SIL validation maintained

  @P1 @integration @Benefits
  Scenario: Validate benefit cost posted to CO cost center
    Given Payroll with benefits
    Given FI/CO posting active
    When Run payroll.
    And Post to FI.
    And Review CC posting for benefit cost.
    Then Benefit cost on correct cost center
    And reconciles to payroll result

  @P1 @negative @Budget
  Scenario: Block overspend on WBS availability control
    Given WBS with budget
    Given availability control active
    When Attempt cost posting exceeding WBS budget.
    And Review system response.
    Then System warns or blocks per tolerance profile
    And budget usage tracked

  @P1 @positive @Warehouse-Management
  Scenario: Warehouse inventory LI01/LI20
    Given Warehouse with stock
    Given WM physical inventory active
    When LI01 → Create physical inventory doc for bin
    And LI11 → Enter count
    And LI20 → Post differences
    Then Bin stock adjusted
    And differences posted
    And IM stock synchronized with WM
