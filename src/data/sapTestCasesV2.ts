// =============================================================================
// SAP Test Cases Repository — v2.0
// 200+ test cases across FI, CO, MM, SD, PP, QM, PM, HCM, PS, WM, Basis
// + Industry: Pharma, Manufacturing, Retail, Banking, Oil & Gas, Healthcare,
//             Utilities, Public Sector
// =============================================================================

type Priority = 'High' | 'Medium' | 'Low';
type AutoFeasibility = 'High' | 'Medium' | 'Low';
type TestType = 'Functional' | 'Integration' | 'Regression' | 'Performance' | 'Negative';
type SAPModule =
  | 'FI' | 'CO' | 'MM' | 'SD' | 'PP' | 'QM' | 'PM'
  | 'HCM' | 'PS' | 'WM' | 'Basis' | 'IS-H' | 'IS-U';

type Industry =
  | 'All' | 'Pharma' | 'Manufacturing' | 'Retail'
  | 'Banking' | 'Oil & Gas' | 'Healthcare' | 'Utilities' | 'Public Sector';

interface TestCase {
  id: string;
  module: SAPModule;
  subModule: string;
  industry: Industry;
  scenario: string;
  testCase: string;
  preCond: string;
  steps: string;
  expected: string;
  priority: Priority;
  testType: TestType;
  autoFeasibility: AutoFeasibility;
  bapi: string;
}

export const SAP_TEST_CASES_V2: TestCase[] = [

  // ============================================================
  // FI – GENERAL LEDGER
  // ============================================================
  {
    id: 'FI-GL-001', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Chart of Accounts Setup', testCase: 'Create Chart of Accounts',
    preCond: 'SAP S/4HANA configured; Admin access',
    steps: '1. Go to FS00\n2. Enter CoA key\n3. Assign company code\n4. Configure GL account group\n5. Save',
    expected: 'CoA created and assigned; appears in FS00 lookup',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_GL_ACC_GETDETAIL',
  },
  {
    id: 'FI-GL-002', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'GL Account Creation', testCase: 'Create new GL master record',
    preCond: 'Chart of accounts exists; FI customizing complete',
    steps: '1. FS00 → Create\n2. Enter account number + CoA\n3. Set account type (P&L/Balance Sheet)\n4. Maintain control data\n5. Maintain company code data\n6. Save',
    expected: 'GL account created; visible in G/L account list; can post against it',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'eCATT SCAT_GLMASTER',
  },
  {
    id: 'FI-GL-003', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Manual Journal Entry', testCase: 'Post manual GL document',
    preCond: 'GL accounts open for posting; period open; authorization F-02',
    steps: '1. F-02 → Enter doc date, posting date\n2. Enter debit account + amount\n3. Enter credit account\n4. Check balance = 0\n5. Simulate\n6. Post',
    expected: 'Document posted; doc number generated; balance = 0; reversal possible',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ACC_GL_POSTING_POST',
  },
  {
    id: 'FI-GL-004', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Document Reversal', testCase: 'Reverse a posted FI document',
    preCond: 'Posted FI document exists; period open; authorization FB08',
    steps: '1. FB08 → Enter original doc number\n2. Enter reversal reason\n3. Enter reversal posting date\n4. Execute',
    expected: 'Reversal document created; original document flagged as reversed; net effect = 0',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ACC_DOCUMENT_REV_POST',
  },
  {
    id: 'FI-GL-005', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Period Close', testCase: 'Open/Close Posting Period',
    preCond: 'FI customizing; OB52 authorization',
    steps: '1. OB52 → Select variant\n2. Close prior period\n3. Open current period\n4. Save\n5. Attempt posting to closed period',
    expected: 'Closed period rejects posting with error; open period accepts; audit log updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'FI_PERIOD_DETERMINE',
  },
  {
    id: 'FI-GL-006', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Financial Statement Version', testCase: 'Run Balance Sheet / P&L',
    preCond: 'Posted transactions; FSV configured; S_ALR_87012284 authorization',
    steps: '1. S_ALR_87012284 → Enter company code\n2. Select FSV\n3. Set fiscal year/period\n4. Execute',
    expected: 'Balance sheet totals match GL balances; assets = liabilities + equity',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'Report RFBILA00',
  },
  {
    id: 'FI-GL-007', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Intercompany Posting', testCase: 'Post cross-company GL entry',
    preCond: 'Two company codes configured; intercompany GL accounts exist; OBYA settings',
    steps: '1. F-02 → Enter sending company code\n2. Enter receiving company code line item\n3. Post',
    expected: 'Two documents created (one per company code); intercompany clearing accounts balanced',
    priority: 'High', testType: 'Integration', autoFeasibility: 'Medium', bapi: 'RFC_INTERCOMPANY_POST',
  },
  {
    id: 'FI-GL-008', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Recurring Entry', testCase: 'Create and execute recurring posting',
    preCond: 'Recurring entry template exists; F.14 authorization',
    steps: '1. FBD1 → Create recurring document\n2. Enter schedule (monthly)\n3. Enter GL accounts\n4. Run F.14 to execute',
    expected: 'Recurring entries posted per schedule; FI documents created; can view in FB03',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'Batch job SAPF120B',
  },
  {
    id: 'FI-GL-009', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Foreign Currency Revaluation', testCase: 'Run open item revaluation FAGL_FC_VAL',
    preCond: 'Open items in foreign currency; exchange rates maintained in OB08',
    steps: '1. FAGL_FC_VAL → Enter company code + key date\n2. Select GL accounts\n3. Simulation run\n4. Execute productive run',
    expected: 'Unrealized FX gain/loss posted; balance sheet accounts adjusted; reversal document auto-created on key date+1',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ACC_GL_POSTING_POST',
  },
  {
    id: 'FI-GL-010', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Negative Posting – Closed Period', testCase: 'Attempt posting to locked period',
    preCond: 'Posting period for prior month is closed in OB52',
    steps: '1. F-02 → Set posting date to prior closed month\n2. Enter GL accounts + amounts\n3. Attempt to post',
    expected: 'System error: "Posting period MMM/YYYY is not open"; posting rejected; no document number generated',
    priority: 'High', testType: 'Negative', autoFeasibility: 'High', bapi: 'FI_PERIOD_DETERMINE',
  },

  // ============================================================
  // FI – ACCOUNTS RECEIVABLE
  // ============================================================
  {
    id: 'FI-AR-001', module: 'FI', subModule: 'Accounts Receivable', industry: 'All',
    scenario: 'Customer Invoice', testCase: 'Post Customer Invoice FB70',
    preCond: 'Customer master exists; AR account configured; tax code set up',
    steps: '1. FB70 → Enter customer number\n2. Enter invoice date + posting date\n3. Enter G/L line items\n4. Check tax\n5. Simulate\n6. Post',
    expected: 'AR document posted; customer balance updated; due date calculated per payment terms',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ACC_DOCUMENT_POST',
  },
  {
    id: 'FI-AR-002', module: 'FI', subModule: 'Accounts Receivable', industry: 'All',
    scenario: 'Customer Payment', testCase: 'Post incoming payment F-28',
    preCond: 'Open customer invoice exists; bank account configured',
    steps: '1. F-28 → Enter bank account\n2. Enter customer\n3. Select open item\n4. Apply payment\n5. Post',
    expected: 'Invoice cleared; customer balance reduced; bank account debited; clearing document created',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_INCOMINGINVOICE_CREATE',
  },
  {
    id: 'FI-AR-003', module: 'FI', subModule: 'Accounts Receivable', industry: 'All',
    scenario: 'Dunning Run', testCase: 'Execute customer dunning',
    preCond: 'Overdue customer invoices; dunning procedure configured; F150 authorization',
    steps: '1. F150 → Set dunning date\n2. Enter company code + accounts\n3. Run dunning proposal\n4. Review\n5. Print dunning notices',
    expected: 'Dunning levels assigned; dunning notices generated; dunning history updated on customer',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'Report RFMAHN00',
  },
  {
    id: 'FI-AR-004', module: 'FI', subModule: 'Accounts Receivable', industry: 'All',
    scenario: 'Credit Memo', testCase: 'Post customer credit memo FB75',
    preCond: 'Original invoice posted; customer master exists',
    steps: '1. FB75 → Enter customer\n2. Reference original invoice\n3. Enter credit amount\n4. Post',
    expected: 'Credit memo posted; customer balance reduced; can clear against open invoice',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ACC_DOCUMENT_POST',
  },
  {
    id: 'FI-AR-005', module: 'FI', subModule: 'Accounts Receivable', industry: 'All',
    scenario: 'Down Payment', testCase: 'Handle customer down payment',
    preCond: 'Down payment GL account configured; customer exists; F-29 authorization',
    steps: '1. F-29 → Enter customer + amount\n2. Post down payment\n3. F-39 → Clear down payment against invoice',
    expected: 'Special G/L indicator set; down payment in customer account; clears correctly vs invoice',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ACC_GL_POSTING_POST',
  },
  {
    id: 'FI-AR-006', module: 'FI', subModule: 'Accounts Receivable', industry: 'All',
    scenario: 'Partial Payment', testCase: 'Apply partial payment against invoice',
    preCond: 'Open customer invoice exists; partial payment received',
    steps: '1. F-28 → Enter customer + bank account\n2. Select open invoice\n3. Enter partial amount\n4. Residual item or partial clearing\n5. Post',
    expected: 'Partial clearing document created; residual open item remains with reduced amount; payment allocated correctly',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ACC_DOCUMENT_POST',
  },
  {
    id: 'FI-AR-007', module: 'FI', subModule: 'Accounts Receivable', industry: 'All',
    scenario: 'Bad Debt Write-off', testCase: 'Write off uncollectible receivable',
    preCond: 'Overdue invoice past write-off threshold; bad debt GL account configured',
    steps: '1. F-32 → Select customer open item\n2. Set residual type = write-off\n3. Enter bad debt expense GL account\n4. Post',
    expected: 'Receivable cleared; bad debt expense posted; customer balance zero; audit trail maintained',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ACC_DOCUMENT_POST',
  },

  // ============================================================
  // FI – ACCOUNTS PAYABLE
  // ============================================================
  {
    id: 'FI-AP-001', module: 'FI', subModule: 'Accounts Payable', industry: 'All',
    scenario: 'Vendor Invoice', testCase: 'Post Vendor Invoice MIRO/FB60',
    preCond: 'Vendor master exists; AP account configured; PO with GR (for MIRO)',
    steps: '1. MIRO → Enter PO number\n2. Check GR/IR match\n3. Enter vendor invoice number\n4. Check amounts\n5. Post',
    expected: 'Vendor invoice posted; PO history updated; GR/IR account cleared; open item in AP',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_INCOMINGINVOICE_CREATE',
  },
  {
    id: 'FI-AP-002', module: 'FI', subModule: 'Accounts Payable', industry: 'All',
    scenario: 'Payment Run', testCase: 'Automatic payment program F110',
    preCond: 'Open vendor invoices; payment method configured; bank account set up',
    steps: '1. F110 → Enter run date + company code\n2. Enter vendors\n3. Set parameters\n4. Proposal run\n5. Review\n6. Payment run\n7. Generate DME',
    expected: 'Invoices cleared; payment documents created; bank file generated; vendor balance zero',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PAYMENT_MAINTAIN',
  },
  {
    id: 'FI-AP-003', module: 'FI', subModule: 'Accounts Payable', industry: 'All',
    scenario: 'Vendor Credit Memo', testCase: 'Post vendor credit memo FB65',
    preCond: 'Vendor invoice exists; FB65 authorization',
    steps: '1. FB65 → Enter vendor\n2. Reference original invoice\n3. Enter credit amount\n4. Post',
    expected: 'Credit memo posted; vendor balance adjusted; clears against original invoice in F110',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ACC_DOCUMENT_POST',
  },
  {
    id: 'FI-AP-004', module: 'FI', subModule: 'Accounts Payable', industry: 'All',
    scenario: 'GR/IR Clearing', testCase: 'Clear GR/IR account MR11',
    preCond: 'Uncleared GR/IR items exist; goods receipt posted without matching invoice',
    steps: '1. MR11 → Enter plant/PO\n2. Execute analysis\n3. Select uncleared items\n4. Post clearing',
    expected: 'GR/IR accounts balanced; quantity/price differences posted to appropriate accounts',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'Report RMRP0000',
  },
  {
    id: 'FI-AP-005', module: 'FI', subModule: 'Accounts Payable', industry: 'All',
    scenario: 'Recurring Vendor Payment', testCase: 'Automatic recurring vendor payment',
    preCond: 'Recurring vendor (e.g. rent); recurring document template exists',
    steps: '1. FBD1 → Create recurring template\n2. Enter vendor + GL\n3. Schedule monthly\n4. Run F.14',
    expected: 'Monthly payments scheduled; documents posted on schedule; audit trail visible',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'Batch SAPF120B',
  },
  {
    id: 'FI-AP-006', module: 'FI', subModule: 'Accounts Payable', industry: 'All',
    scenario: 'Early Payment Discount', testCase: 'Apply cash discount on payment F110',
    preCond: 'Vendor invoice with payment terms (e.g., 2%/10 net 30); within discount period',
    steps: '1. F110 → Run payment proposal within discount period\n2. Verify cash discount calculation\n3. Execute payment\n4. Check discount posting',
    expected: 'Net payment (invoice - discount) paid; cash discount income posted to GL; discount taken within terms',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PAYMENT_MAINTAIN',
  },

  // ============================================================
  // FI – ASSET ACCOUNTING
  // ============================================================
  {
    id: 'FI-AA-001', module: 'FI', subModule: 'Asset Accounting', industry: 'All',
    scenario: 'Asset Master Creation', testCase: 'Create fixed asset master AS01',
    preCond: 'Asset class configured; company code; depreciation area set up',
    steps: '1. AS01 → Enter asset class + company code\n2. Maintain general data\n3. Assign cost center\n4. Set depreciation key + useful life\n5. Save',
    expected: 'Asset master created; asset number generated; depreciation calculation scheduled',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_FIXEDASSET_CREATE1',
  },
  {
    id: 'FI-AA-002', module: 'FI', subModule: 'Asset Accounting', industry: 'All',
    scenario: 'Asset Acquisition', testCase: 'Post asset acquisition ABZON',
    preCond: 'Asset master exists; vendor invoice or direct capitalization',
    steps: '1. F-90 → Enter asset + amount\n2. Enter vendor or offset GL\n3. Post',
    expected: 'Asset value updated in APC; depreciation start date set; asset balance sheet account updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_FIXEDASSET_OVRTAKE_CREATE',
  },
  {
    id: 'FI-AA-003', module: 'FI', subModule: 'Asset Accounting', industry: 'All',
    scenario: 'Asset Depreciation', testCase: 'Run depreciation AFAB',
    preCond: 'Assets with values; depreciation keys configured; period open',
    steps: '1. AFAB → Enter company code + fiscal year + period\n2. Select depreciation area\n3. Test run first\n4. Execute',
    expected: 'Depreciation posted; accumulated depreciation account credited; expense account debited; NBV updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'Report RABUCH00',
  },
  {
    id: 'FI-AA-004', module: 'FI', subModule: 'Asset Accounting', industry: 'All',
    scenario: 'Asset Retirement', testCase: 'Retire asset ABAON',
    preCond: 'Asset exists with value; retirement GL accounts configured',
    steps: '1. ABAON → Enter asset\n2. Partial/full retirement\n3. Revenue amount\n4. Post',
    expected: 'Asset cleared; gain/loss posted; removed from BS at NBV',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_FIXEDASSET_RETIRE_SALE',
  },
  {
    id: 'FI-AA-005', module: 'FI', subModule: 'Asset Accounting', industry: 'All',
    scenario: 'Asset Transfer', testCase: 'Transfer asset between cost centers ABUMN',
    preCond: 'Two assets or cost centers; ABUMN authorization',
    steps: '1. ABUMN → Enter sending asset\n2. Enter receiving asset or create new\n3. Transfer date\n4. Post',
    expected: 'Value transferred between assets; cost center updated; depreciation continues on receiving asset',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_FIXEDASSET_TRANSFER',
  },
  {
    id: 'FI-AA-006', module: 'FI', subModule: 'Asset Accounting', industry: 'All',
    scenario: 'Asset Under Construction', testCase: 'Settle AuC to final asset AIAB/AIBU',
    preCond: 'Asset under construction with costs; settlement rule to final asset; AIAB authorization',
    steps: '1. AIAB → Enter AuC asset + settlement rule\n2. Assign receiving asset\n3. AIBU → Execute settlement\n4. Verify final asset capitalized',
    expected: 'AuC balance transferred to final asset; AuC zeroed; final asset depreciation starts from capitalization date',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_FIXEDASSET_OVRTAKE_CREATE',
  },

  // ============================================================
  // CO – CONTROLLING
  // ============================================================
  {
    id: 'CO-CCA-001', module: 'CO', subModule: 'Cost Center Accounting', industry: 'All',
    scenario: 'Cost Center Creation', testCase: 'Create cost center KS01',
    preCond: 'Controlling area configured; cost center standard hierarchy exists',
    steps: '1. KS01 → Enter cost center + controlling area\n2. Enter valid-from date\n3. Assign category\n4. Assign profit center\n5. Save',
    expected: 'Cost center created; visible in cost center hierarchy; can post to it',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_COSTCENTER_CREATEMULTIPLE',
  },
  {
    id: 'CO-CCA-002', module: 'CO', subModule: 'Cost Center Accounting', industry: 'All',
    scenario: 'Cost Center Planning', testCase: 'Plan costs for cost center KP06',
    preCond: 'Cost center exists; plan version 0 active; planning authorization',
    steps: '1. KP06 → Enter cost center + cost element\n2. Enter plan period\n3. Enter values by period\n4. Save',
    expected: 'Plan values saved; variance analysis possible vs actuals; budget reports show plan',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_COSTCENTER_PLANNING_POST',
  },
  {
    id: 'CO-CCA-003', module: 'CO', subModule: 'Cost Center Accounting', industry: 'All',
    scenario: 'Internal Activity Allocation', testCase: 'Repost actual costs KB21N',
    preCond: 'Sender/receiver cost centers exist; activity type configured',
    steps: '1. KB21N → Enter sending cost center\n2. Enter activity type\n3. Enter receiver cost center\n4. Enter quantity\n5. Post',
    expected: 'Cost transferred; sender reduced; receiver increased; activity rate applied',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ACC_ACT_ALLOC_POST',
  },
  {
    id: 'CO-CCA-004', module: 'CO', subModule: 'Cost Center Accounting', industry: 'All',
    scenario: 'Cost Center Report', testCase: 'Run actual vs plan report S_ALR_87013611',
    preCond: 'Posted costs on cost centers; plan values maintained',
    steps: '1. S_ALR_87013611 → Enter controlling area\n2. Enter cost center + fiscal year\n3. Execute',
    expected: 'Variance report shows actual vs planned; drill-down to line items possible; export to Excel',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Low', bapi: 'Report RKAEP000',
  },
  {
    id: 'CO-CCA-005', module: 'CO', subModule: 'Cost Center Accounting', industry: 'All',
    scenario: 'Distribution Cycle', testCase: 'Run cost distribution KSV5',
    preCond: 'Distribution cycle configured; sender/receiver cost centers with costs',
    steps: '1. KSV5 → Enter cycle + period\n2. Test run first\n3. Execute productive run\n4. Verify sender zeroed',
    expected: 'Costs distributed per allocation basis; sender cost center zeroed; receivers debited; audit trail in CO documents',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ACC_ACT_ALLOC_POST',
  },
  {
    id: 'CO-IO-001', module: 'CO', subModule: 'Internal Orders', industry: 'All',
    scenario: 'Internal Order Creation', testCase: 'Create internal order KO01',
    preCond: 'Order type configured; settlement profile defined',
    steps: '1. KO01 → Select order type\n2. Enter description\n3. Assign responsible cost center\n4. Set budget availability control\n5. Release order',
    expected: 'Order created in status REL; can receive postings; settlement rule required',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ORDER_CREATE',
  },
  {
    id: 'CO-IO-002', module: 'CO', subModule: 'Internal Orders', industry: 'All',
    scenario: 'Order Settlement', testCase: 'Settle internal order KO88',
    preCond: 'Internal order with postings; settlement rule defined; receiver exists',
    steps: '1. KO88 → Enter order + period\n2. Test run\n3. Execute settlement\n4. Verify receiver',
    expected: 'Costs settled to receiver (cost center/asset/GL); order balance = 0 after full settlement',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ORDER_SETTLE',
  },
  {
    id: 'CO-IO-003', module: 'CO', subModule: 'Internal Orders', industry: 'All',
    scenario: 'Budget Availability Control', testCase: 'Test order over-budget posting',
    preCond: 'Internal order with budget assigned (KO22); availability control active',
    steps: '1. KO22 → Assign budget to order\n2. Post costs exceeding budget\n3. Observe system response',
    expected: 'Warning or error per tolerance profile; over-budget posting blocked or warned; budget controller notified',
    priority: 'High', testType: 'Negative', autoFeasibility: 'High', bapi: 'BAPI_ORDER_CREATE',
  },
  {
    id: 'CO-PC-001', module: 'CO', subModule: 'Product Costing', industry: 'All',
    scenario: 'Standard Cost Estimate', testCase: 'Create standard cost estimate CK11N',
    preCond: 'Material master exists; BOM + routing defined; prices maintained',
    steps: '1. CK11N → Enter material + plant\n2. Enter costing variant + lot size\n3. Execute\n4. Review itemization\n5. Mark and release',
    expected: 'Standard cost calculated; price updated in material master; variance analysis enabled',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_COSTESTIMATE_CREATE',
  },
  {
    id: 'CO-PC-002', module: 'CO', subModule: 'Product Costing', industry: 'All',
    scenario: 'WIP Calculation', testCase: 'Calculate WIP for production order KKAX',
    preCond: 'Released production order with partial confirmations; not technically complete',
    steps: '1. KKAX → Enter production order\n2. Enter period\n3. Execute WIP calculation',
    expected: 'WIP calculated and posted to balance sheet; P&L impact deferred; WIP reversed when order completed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_COSTESTIMATE_CREATE',
  },
  {
    id: 'CO-PA-001', module: 'CO', subModule: 'Profitability Analysis', industry: 'All',
    scenario: 'COPA Report', testCase: 'Run profitability analysis KE30',
    preCond: 'CO-PA active; actual values posted; profitability segment defined',
    steps: '1. KE30 → Select report\n2. Enter period\n3. Set characteristic values (product/region)\n4. Execute',
    expected: 'Margin contribution displayed by segment; drill-through to SD billing documents',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Low', bapi: 'Report RKKBB000',
  },
  {
    id: 'CO-PA-002', module: 'CO', subModule: 'Profitability Analysis', industry: 'All',
    scenario: 'COPA Plan vs Actual', testCase: 'Upload COPA plan and compare KE31',
    preCond: 'CO-PA active; planning version configured; plan data available',
    steps: '1. KE31 → Select planning method\n2. Enter plan values per profitability segment\n3. KE30 → Compare plan vs actual',
    expected: 'Plan uploaded; variance visible in COPA report; margin gap by product/customer clearly shown',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Low', bapi: 'Report RKKBB000',
  },

  // ============================================================
  // MM – PURCHASING
  // ============================================================
  {
    id: 'MM-PR-001', module: 'MM', subModule: 'Purchasing', industry: 'All',
    scenario: 'Purchase Requisition Creation', testCase: 'Create PR ME51N',
    preCond: 'Material master exists; plant configured; purchasing org set up',
    steps: '1. ME51N → Enter material number\n2. Enter quantity + delivery date\n3. Enter plant + storage location\n4. Assign account\n5. Save',
    expected: 'PR created with unique number; status Open; source of supply can be assigned; approval workflow triggered',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PR_CREATE',
  },
  {
    id: 'MM-PR-002', module: 'MM', subModule: 'Purchasing', industry: 'All',
    scenario: 'PR Approval Workflow', testCase: 'Approve purchase requisition',
    preCond: 'PR with approval workflow configured; approver has authorization',
    steps: '1. SBWP → Inbox → Open PR workflow item\n2. Review PR details\n3. Approve or reject\n4. Add comments',
    expected: 'PR status changes to Approved; PO can be created from PR; rejection notifies requester',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'WS_EXECUTE_WORKITEM',
  },
  {
    id: 'MM-PO-001', module: 'MM', subModule: 'Purchasing', industry: 'All',
    scenario: 'Purchase Order Creation', testCase: 'Create PO ME21N from PR',
    preCond: 'Approved PR exists; vendor master exists; info record or contract',
    steps: '1. ME21N → Reference PR\n2. Confirm vendor assignment\n3. Verify price + delivery date\n4. Add account assignment\n5. Order',
    expected: 'PO created; PR linked; vendor notified; GR planned date set; commitment created in CO',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PO_CREATE1',
  },
  {
    id: 'MM-PO-002', module: 'MM', subModule: 'Purchasing', industry: 'All',
    scenario: 'PO Amendment', testCase: 'Change quantity/price on issued PO ME22N',
    preCond: 'Issued PO exists; no GR yet or partial GR',
    steps: '1. ME22N → Open PO\n2. Change quantity or price\n3. Add change reason\n4. Save\n5. Reprint PO',
    expected: 'PO change history recorded; version management updated; commitment adjusted; vendor gets updated PO',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PO_CHANGE',
  },
  {
    id: 'MM-PO-003', module: 'MM', subModule: 'Purchasing', industry: 'All',
    scenario: 'Framework Order', testCase: 'Create blanket PO (Framework order)',
    preCond: 'Vendor exists; value limit defined; account assignment category',
    steps: '1. ME21N → Order type FO\n2. Enter validity period\n3. Enter overall limit\n4. No material/qty required\n5. Save',
    expected: 'Framework order created; GR not required; invoice posts against PO limit; budget tracked',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_PO_CREATE1',
  },
  {
    id: 'MM-PO-004', module: 'MM', subModule: 'Purchasing', industry: 'All',
    scenario: 'Source Determination', testCase: 'Auto-assign source of supply ME01',
    preCond: 'Source list configured for material; info records/contracts exist',
    steps: '1. ME51N → Create PR without vendor\n2. ME57 → Assign source of supply\n3. System proposes vendor from source list\n4. Convert to PO',
    expected: 'Vendor automatically proposed from source list; info record price applied; PO created with preferred supplier',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PO_CREATE1',
  },
  {
    id: 'MM-GR-001', module: 'MM', subModule: 'Goods Receipt', industry: 'All',
    scenario: 'GR against PO', testCase: 'MIGO - GR for PO',
    preCond: 'PO issued; goods physically received; MIGO authorization',
    steps: '1. MIGO → Goods Receipt → Purchase Order\n2. Enter PO number\n3. Enter quantity received\n4. Enter storage location\n5. Post',
    expected: 'Material document created; stock increased; GR/IR account posted; PO history updated; open PO qty reduced',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'MM-GR-002', module: 'MM', subModule: 'Goods Receipt', industry: 'All',
    scenario: 'Return Delivery', testCase: 'Return goods to vendor MIGO-RE',
    preCond: 'GR document exists; vendor return authorization',
    steps: '1. MIGO → Return Delivery → Material Document\n2. Enter GR document\n3. Enter return reason\n4. Post',
    expected: 'Stock reduced; GR/IR reversed; return delivery document created; vendor credit memo can follow',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'MM-GR-003', module: 'MM', subModule: 'Goods Receipt', industry: 'All',
    scenario: 'GR without PO', testCase: 'MIGO - Other GR (561 movement)',
    preCond: 'Material master exists; storage location configured',
    steps: '1. MIGO → Other → 501 or 561\n2. Enter material + quantity + plant/sloc\n3. Post',
    expected: 'Stock updated; material document created; no financial posting for consignment/free entry',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'MM-IV-001', module: 'MM', subModule: 'Invoice Verification', industry: 'All',
    scenario: '3-Way Match Invoice', testCase: 'MIRO invoice with 3-way match',
    preCond: 'PO + GR exists; vendor invoice received',
    steps: '1. MIRO → Enter PO reference\n2. System proposes GR quantity and price\n3. Enter vendor invoice number\n4. Check discrepancies\n5. Post',
    expected: 'Invoice posted; GR/IR cleared; if price variance > tolerance → blocked for payment automatically',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_INCOMINGINVOICE_CREATE',
  },
  {
    id: 'MM-IV-002', module: 'MM', subModule: 'Invoice Verification', industry: 'All',
    scenario: 'Invoice Block Release', testCase: 'Release blocked invoice MRBR',
    preCond: 'Blocked invoice in MIRO; approver authorization MRBR',
    steps: '1. MRBR → Enter company code\n2. Display blocked invoices\n3. Select invoice\n4. Release with reason',
    expected: 'Invoice unblocked; available for payment run F110; release reason recorded in PO history',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_MRBR_SELECT',
  },
  {
    id: 'MM-IV-003', module: 'MM', subModule: 'Invoice Verification', industry: 'All',
    scenario: 'Subsequent Debit/Credit', testCase: 'Post subsequent debit to existing invoice',
    preCond: 'Existing invoice posted in MIRO; vendor sends additional charge',
    steps: '1. MIRO → Transaction type: Subsequent debit\n2. Reference original PO\n3. Enter additional charge amount\n4. Post',
    expected: 'Additional cost posted to GR/IR or price difference account; PO price updated; no new GR required',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_INCOMINGINVOICE_CREATE',
  },
  {
    id: 'MM-IM-001', module: 'MM', subModule: 'Inventory Management', industry: 'All',
    scenario: 'Stock Transfer', testCase: 'Transfer stock between plants STO',
    preCond: 'Sending and receiving plants exist; STO configured; stock available',
    steps: '1. ME21N → Order type UB\n2. Enter supplying plant + receiving plant\n3. Enter material + qty\n4. Create delivery VL10B\n5. GI from sending + GR at receiving',
    expected: 'Stock reduced at sending plant; stock increased at receiving; STO history complete',
    priority: 'High', testType: 'Integration', autoFeasibility: 'High', bapi: 'BAPI_PO_CREATE1 + BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'MM-IM-002', module: 'MM', subModule: 'Inventory Management', industry: 'All',
    scenario: 'Physical Inventory', testCase: 'Count and post physical inventory MI01/MI04/MI07',
    preCond: 'Storage location with stock; physical inventory period open',
    steps: '1. MI01 → Create physical inventory document\n2. MI04 → Enter count\n3. MI07 → Post differences',
    expected: 'Inventory differences posted; stock adjusted; loss/gain posted to inventory adjustment account',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_MATPHYSINV_COUNT',
  },
  {
    id: 'MM-IM-003', module: 'MM', subModule: 'Inventory Management', industry: 'All',
    scenario: 'Goods Issue to Cost Center', testCase: 'MIGO 201 movement',
    preCond: 'Material in stock; cost center exists',
    steps: '1. MIGO → Goods Issue → Other\n2. Enter material + qty + plant\n3. Enter cost center\n4. Movement type 201\n5. Post',
    expected: 'Stock reduced; cost posted to cost center; material document created; CO document created',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'MM-IM-004', module: 'MM', subModule: 'Inventory Management', industry: 'All',
    scenario: 'Reorder Point Planning', testCase: 'Verify reorder point triggers replenishment',
    preCond: 'Material with MRP type VB (reorder point); safety stock and reorder point configured',
    steps: '1. Reduce stock below reorder point via goods issue\n2. MD04 → Review stock/requirements list\n3. Run MD01 → MRP\n4. Check proposals created',
    expected: 'MRP creates purchase requisition automatically when stock < reorder point; PR quantity covers safety stock + demand',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_MATERIAL_MRP_LIST',
  },
  {
    id: 'MM-MM-001', module: 'MM', subModule: 'Material Master', industry: 'All',
    scenario: 'Material Master Creation', testCase: 'Create material master MM01',
    preCond: 'Material type configured; industry sector selected',
    steps: '1. MM01 → Enter material number\n2. Select industry sector + material type\n3. Select views (Basic, MRP, Purchasing, Accounting)\n4. Enter data per view\n5. Save',
    expected: 'Material master created; MRP type set; price control configured; purchasing active',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_MATERIAL_SAVEDATA',
  },
  {
    id: 'MM-MM-002', module: 'MM', subModule: 'Material Master', industry: 'All',
    scenario: 'MRP Run', testCase: 'Execute MRP MD01',
    preCond: 'Material master with MRP type; BOM exists; open requirements (SO/PR)',
    steps: '1. MD01 → Enter plant\n2. Select MRP type (NEUPL/NETCH)\n3. Execute\n4. MD04 → Review results',
    expected: 'Purchase proposals (PR) created; production proposals created; planning file updated; exception messages generated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_MATERIAL_MRP_LIST',
  },

  // ============================================================
  // SD – SALES & DISTRIBUTION
  // ============================================================
  {
    id: 'SD-SO-001', module: 'SD', subModule: 'Sales Order', industry: 'All',
    scenario: 'Standard Sales Order', testCase: 'Create sales order VA01',
    preCond: 'Customer master exists; material master exists; pricing configured',
    steps: '1. VA01 → Order type OR\n2. Enter sold-to party + material\n3. Confirm quantity\n4. Verify pricing\n5. Check availability\n6. Save',
    expected: 'Sales order created; pricing determined; ATP check done; delivery date confirmed; credit check passed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_SALESORDER_CREATEFROMDAT2',
  },
  {
    id: 'SD-SO-002', module: 'SD', subModule: 'Sales Order', industry: 'All',
    scenario: 'Sales Order with Free Goods', testCase: 'Create SO with free goods',
    preCond: 'Free goods condition type configured; customer eligible',
    steps: '1. VA01 → Enter material above minimum qty\n2. System automatically adds free goods line\n3. Verify free goods quantity\n4. Save',
    expected: 'Free goods line added with zero price; separate line item; correct statistical value calculated',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_SALESORDER_CREATEFROMDAT2',
  },
  {
    id: 'SD-SO-003', module: 'SD', subModule: 'Sales Order', industry: 'All',
    scenario: 'Rush Order', testCase: 'Create rush order for immediate delivery',
    preCond: 'Rush order type configured; stock available',
    steps: '1. VA01 → Order type RO\n2. Enter customer + material\n3. Delivery date = today\n4. Save',
    expected: 'Order created; delivery immediately proposed; no delivery block; picking can start immediately',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_SALESORDER_CREATEFROMDAT2',
  },
  {
    id: 'SD-SO-004', module: 'SD', subModule: 'Sales Order', industry: 'All',
    scenario: 'Credit Check', testCase: 'Sales order credit limit check',
    preCond: 'Customer credit limit set; credit management FD32 configured',
    steps: '1. VA01 → Create order above credit limit\n2. Verify system response\n3. Check credit block\n4. FD32 → Release credit block',
    expected: 'Order blocked with credit hold; credit controller notified; after release, order processes normally',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_CREDITMANAGEMENT_GETDETAI',
  },
  {
    id: 'SD-SO-005', module: 'SD', subModule: 'Sales Order', industry: 'All',
    scenario: 'Sales Order Change', testCase: 'Modify quantity/date on existing SO VA02',
    preCond: 'Existing sales order; no delivery created yet',
    steps: '1. VA02 → Enter order number\n2. Change quantity or requested delivery date\n3. Repricing\n4. Save',
    expected: 'Changes saved; pricing recalculated if applicable; delivery schedule updated; change log maintained',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_SALESORDER_CHANGE',
  },
  {
    id: 'SD-SO-006', module: 'SD', subModule: 'Sales Order', industry: 'All',
    scenario: 'Consignment Fill-up', testCase: 'Create consignment fill-up order KB',
    preCond: 'Consignment processing configured; customer consignment warehouse exists',
    steps: '1. VA01 → Order type KB\n2. Enter customer + material + qty\n3. Save\n4. Create delivery + GI',
    expected: 'Stock moved to customer consignment; billing document not created at GI; customer special stock updated',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_SALESORDER_CREATEFROMDAT2',
  },
  {
    id: 'SD-SO-007', module: 'SD', subModule: 'Sales Order', industry: 'All',
    scenario: 'Returns Order', testCase: 'Create customer returns order RE',
    preCond: 'Original billing document exists; returns order type RE configured',
    steps: '1. VA01 → Order type RE\n2. Enter customer + material\n3. Reference original billing document\n4. Enter return reason\n5. Save',
    expected: 'Returns order created; return delivery triggers GR to returns stock; credit memo process initiated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_SALESORDER_CREATEFROMDAT2',
  },
  {
    id: 'SD-DEL-001', module: 'SD', subModule: 'Delivery', industry: 'All',
    scenario: 'Outbound Delivery', testCase: 'Create outbound delivery VL01N',
    preCond: 'Sales order exists; stock available; shipping point configured',
    steps: '1. VL01N → Enter shipping point + SO\n2. System proposes delivery qty\n3. Confirm quantities\n4. Save',
    expected: 'Delivery document created; picking order generated; transfer order possible in WM; delivery block can be set',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_OUTB_DELIVERY_CREATE_SLS',
  },
  {
    id: 'SD-DEL-002', module: 'SD', subModule: 'Delivery', industry: 'All',
    scenario: 'Goods Issue', testCase: 'Post goods issue against delivery VL02N',
    preCond: 'Delivery created; picking completed; goods ready',
    steps: '1. VL02N → Open delivery\n2. Post Goods Issue\n3. Confirm date',
    expected: 'GI posted; stock reduced; billing due list updated; delivery status = completed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_OUTB_DELIVERY_POST_GOODS',
  },
  {
    id: 'SD-DEL-003', module: 'SD', subModule: 'Delivery', industry: 'All',
    scenario: 'Delivery Split', testCase: 'Split delivery by batch/route',
    preCond: 'Multiple batches or routes on single delivery',
    steps: '1. VL02N → Open delivery\n2. Edit → Split delivery\n3. Select split criteria\n4. Execute',
    expected: 'Two or more delivery documents created; original qty preserved across splits; each delivery can be shipped separately',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_OUTB_DELIVERY_SPLIT',
  },
  {
    id: 'SD-BIL-001', module: 'SD', subModule: 'Billing', industry: 'All',
    scenario: 'Invoice Creation', testCase: 'Create customer invoice VF01',
    preCond: 'Goods issue posted; billing type F2 configured',
    steps: '1. VF01 → Enter delivery number\n2. Review billing items + pricing\n3. Save',
    expected: 'Invoice created; FI document posted (AR debit/revenue credit); customer balance updated; output printed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_BILLINGDOC_CREATE',
  },
  {
    id: 'SD-BIL-002', module: 'SD', subModule: 'Billing', industry: 'All',
    scenario: 'Credit Memo', testCase: 'Create credit memo for customer return',
    preCond: 'Returns order RE exists and GR posted',
    steps: '1. VF01 → Enter returns order/delivery\n2. Billing type G2\n3. Post',
    expected: 'Credit memo created; FI document reverses original billing; customer balance adjusted',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_BILLINGDOC_CREATE',
  },
  {
    id: 'SD-BIL-003', module: 'SD', subModule: 'Billing', industry: 'All',
    scenario: 'Billing Plan', testCase: 'Invoice milestone billing',
    preCond: 'Sales order with billing plan; milestone dates defined',
    steps: '1. VF04 → Billing due list → Filter billing plan\n2. Select due milestones\n3. Create invoice',
    expected: 'Partial invoices created per milestone; total = contract value; revenue deferred until recognition',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_BILLINGDOC_CREATE',
  },
  {
    id: 'SD-BIL-004', module: 'SD', subModule: 'Billing', industry: 'All',
    scenario: 'Pro Forma Invoice', testCase: 'Create pro forma invoice for export',
    preCond: 'Sales order or delivery exists; pro forma billing type F5 configured',
    steps: '1. VF01 → Enter delivery\n2. Billing type F5 (pro forma)\n3. Post',
    expected: 'Pro forma invoice created; no FI document generated; used for export customs; can be reprinted multiple times',
    priority: 'Low', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_BILLINGDOC_CREATE',
  },
  {
    id: 'SD-PRC-001', module: 'SD', subModule: 'Pricing', industry: 'All',
    scenario: 'Condition Maintenance', testCase: 'Maintain price list VK11',
    preCond: 'Condition type PR00; pricing procedure assigned',
    steps: '1. VK11 → Enter condition type PR00\n2. Select key (material/customer)\n3. Enter price + validity\n4. Save',
    expected: 'Condition record created; pricing in sales order uses new price; date validity respected',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PRICES_CONDITIONS',
  },
  {
    id: 'SD-PRC-002', module: 'SD', subModule: 'Pricing', industry: 'All',
    scenario: 'Discount Condition', testCase: 'Apply customer-specific discount K007',
    preCond: 'Customer-specific discount configured; condition type K007',
    steps: '1. VK11 → K007\n2. Enter customer + discount%\n3. Enter validity\n4. Verify in VA01',
    expected: 'Discount automatically applied in sales order; net price calculated correctly; statistical value shown',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PRICES_CONDITIONS',
  },

  // ============================================================
  // PP – PRODUCTION PLANNING
  // ============================================================
  {
    id: 'PP-SFC-001', module: 'PP', subModule: 'Shop Floor Control', industry: 'All',
    scenario: 'Production Order Creation', testCase: 'Create production order CO01',
    preCond: 'Material master with PP view; BOM exists; work center/routing',
    steps: '1. CO01 → Enter material + plant\n2. Enter order type PP01\n3. Confirm quantity + dates\n4. Calculate costs\n5. Release',
    expected: 'Production order created; components reserved; capacity load scheduled; cost estimate attached',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PRODORD_CREATE',
  },
  {
    id: 'PP-SFC-002', module: 'PP', subModule: 'Shop Floor Control', industry: 'All',
    scenario: 'Goods Issue to Production Order', testCase: 'MIGO 261 movement',
    preCond: 'Released production order; components in stock',
    steps: '1. MIGO → Goods Issue → Production Order\n2. Enter order number\n3. System proposes components\n4. Confirm quantities\n5. Post',
    expected: 'Components consumed from stock; production order confirmed; actual costs visible',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'PP-SFC-003', module: 'PP', subModule: 'Shop Floor Control', industry: 'All',
    scenario: 'Production Confirmation', testCase: 'Confirm production operation CO11N',
    preCond: 'Released production order with operations; work center active',
    steps: '1. CO11N → Enter order + operation\n2. Enter yield/scrap\n3. Enter actual labor hours\n4. Post',
    expected: 'Actual costs posted; capacity consumed; order progress updated; backflushing possible',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PRODORDCONF_CREATE_HDR',
  },
  {
    id: 'PP-SFC-004', module: 'PP', subModule: 'Shop Floor Control', industry: 'All',
    scenario: 'GR from Production', testCase: 'MIGO 101 for production order',
    preCond: 'Production order with confirmed operations',
    steps: '1. MIGO → Goods Receipt → Order\n2. Enter production order\n3. Enter finished goods quantity\n4. Post',
    expected: 'Finished goods stock increased; production order receipt posted; order status updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'PP-SFC-005', module: 'PP', subModule: 'Shop Floor Control', industry: 'All',
    scenario: 'Order Settlement PP', testCase: 'Settle production order variance CO88',
    preCond: 'Production order technically complete; standard cost exists',
    steps: '1. CO88 → Enter order + period\n2. Test run\n3. Execute settlement',
    expected: 'Variance (actual vs standard) settled; order balance = 0; WIP cleared',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ORDER_SETTLE',
  },
  {
    id: 'PP-SFC-006', module: 'PP', subModule: 'Shop Floor Control', industry: 'All',
    scenario: 'Scrap Posting', testCase: 'Post production scrap with cost variance',
    preCond: 'Released production order; scrap movement type configured',
    steps: '1. CO11N → Enter order + operation\n2. Enter yield qty AND scrap qty\n3. Post confirmation\n4. CO88 → Settle order',
    expected: 'Scrap quantity posted; scrap variance calculated vs standard; cost center or P&L absorbs scrap cost; audit trail complete',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PRODORDCONF_CREATE_HDR',
  },
  {
    id: 'PP-MRP-001', module: 'PP', subModule: 'MRP', industry: 'All',
    scenario: 'MRP Planning Run', testCase: 'Execute MRP for single material MD03',
    preCond: 'Material with MRP type PD; demand from SO or forecast',
    steps: '1. MD03 → Enter material + plant\n2. Select MRP type\n3. Execute\n4. MD04 → Review exceptions',
    expected: 'Planned orders/PRs created to cover demand; exception messages reviewed; pegging visible',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_MATERIAL_MRP_LIST',
  },
  {
    id: 'PP-MRP-002', module: 'PP', subModule: 'MRP', industry: 'All',
    scenario: 'Planned Order Conversion', testCase: 'Convert planned order to production order CO40',
    preCond: 'MRP planned orders exist; plant authorized for production',
    steps: '1. CO40 → Enter planned order\n2. Review order dates + components\n3. Convert to production order\n4. Release',
    expected: 'Production order created from planned order; components reserved; capacity requirements updated; planned order deleted',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PRODORD_CREATE',
  },

  // ============================================================
  // QM – QUALITY MANAGEMENT
  // ============================================================
  {
    id: 'QM-IL-001', module: 'QM', subModule: 'Inspection Lots', industry: 'All',
    scenario: 'Inspection Lot Creation', testCase: 'Create inspection lot QA01',
    preCond: 'Inspection type configured; material with QM view',
    steps: '1. QA01 → Enter material + plant + inspection type\n2. Enter lot quantity\n3. Save',
    expected: 'Inspection lot created; usage decision pending; stock in quality inspection',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_INSPLOT_CREATE',
  },
  {
    id: 'QM-IL-002', module: 'QM', subModule: 'Inspection Lots', industry: 'All',
    scenario: 'Results Recording', testCase: 'Record inspection results QE11',
    preCond: 'Inspection lot with inspection plan; characteristics defined',
    steps: '1. QE11 → Enter inspection lot\n2. Enter measured values per characteristic\n3. Confirm pass/fail\n4. Save',
    expected: 'Inspection results saved; characteristic status set; lot status updated; defects can be raised',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_QMEL_CREATE',
  },
  {
    id: 'QM-IL-003', module: 'QM', subModule: 'Inspection Lots', industry: 'All',
    scenario: 'Usage Decision', testCase: 'Make usage decision QA11',
    preCond: 'Inspection lot with recorded results; UD code configured',
    steps: '1. QA11 → Enter inspection lot\n2. Select usage decision code (Accept/Reject)\n3. Stock posting\n4. Post',
    expected: 'Stock transferred from quality inspection to unrestricted/blocked; inspection lot closed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_INSPLOT_USAGEDECISION',
  },
  {
    id: 'QM-QN-001', module: 'QM', subModule: 'Quality Notifications', industry: 'All',
    scenario: 'Quality Notification', testCase: 'Create quality notification QM01',
    preCond: 'Notification type configured; defect catalog maintained',
    steps: '1. QM01 → Select notification type Q1/Q2/Q3\n2. Enter description + defect\n3. Assign tasks\n4. Set priority\n5. Save',
    expected: 'Notification created; tasks assigned; CAPA workflow triggered; deadline set',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_QUALNOT_CREATE',
  },
  {
    id: 'QM-QN-002', module: 'QM', subModule: 'Quality Notifications', industry: 'All',
    scenario: 'Vendor Evaluation', testCase: 'Score vendor quality performance ME61',
    preCond: 'Vendor evaluation criteria configured; delivery + quality data posted',
    steps: '1. ME61 → Enter vendor + purchasing org\n2. Evaluate on-time delivery + quality\n3. Enter scores per criterion\n4. Save',
    expected: 'Vendor score calculated; weighting applied; overall score updated; vendor performance report available ME6B',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_VENDOR_EVALUATE',
  },
  {
    id: 'QM-CE-001', module: 'QM', subModule: 'Certificates', industry: 'All',
    scenario: 'Quality Certificate', testCase: 'Generate quality certificate QC21',
    preCond: 'Inspection lot with usage decision Accept; certificate profile configured',
    steps: '1. QC21 → Enter delivery or inspection lot\n2. Select certificate profile\n3. Generate certificate\n4. Print or transmit to customer',
    expected: 'Certificate of Conformance generated; attached to delivery; batch inspection data included; customer receives automatically',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_QMEL_CREATE',
  },

  // ============================================================
  // PM – PLANT MAINTENANCE
  // ============================================================
  {
    id: 'PM-NOT-001', module: 'PM', subModule: 'Notifications', industry: 'All',
    scenario: 'Malfunction Notification', testCase: 'Create PM notification IW21',
    preCond: 'Equipment/functional location exists; notification type M2',
    steps: '1. IW21 → Enter functional location or equipment\n2. Enter malfunction description\n3. Enter breakdown flag if applicable\n4. Save',
    expected: 'Notification created; equipment breakdown time recorded; maintenance order can be created',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ALM_NOTIF_CREATE',
  },
  {
    id: 'PM-OR-001', module: 'PM', subModule: 'Maintenance Orders', industry: 'All',
    scenario: 'Maintenance Order Creation', testCase: 'Create maintenance order IW31',
    preCond: 'PM notification exists; work center; activity type',
    steps: '1. IW31 → Enter order type PM01\n2. Reference notification\n3. Enter operations + work center\n4. Plan components\n5. Release',
    expected: 'Order created and released; components reserved; capacity planned; costs committed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ALM_ORDER_MAINTAIN',
  },
  {
    id: 'PM-OR-002', module: 'PM', subModule: 'Maintenance Orders', industry: 'All',
    scenario: 'Order Completion', testCase: 'Technically complete maintenance order',
    preCond: 'Maintenance order with confirmations; all work done',
    steps: '1. IW32 → Set technical completion flag\n2. IW41 → Final confirmation\n3. Settlement KO88',
    expected: 'Order status TECO; costs settled; equipment history updated; notification closed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ALM_ORDER_COMPLETE',
  },
  {
    id: 'PM-IP-001', module: 'PM', subModule: 'Preventive Maintenance', industry: 'All',
    scenario: 'Maintenance Plan Creation', testCase: 'Create time-based maintenance plan IP10',
    preCond: 'Equipment/functional location exists; task list configured; maintenance strategy defined',
    steps: '1. IP10 → Enter maintenance plan type\n2. Assign equipment + task list\n3. Set scheduling parameters (cycle, strategy)\n4. Set call horizon\n5. Schedule IP30',
    expected: 'Maintenance plan created; orders/notifications generated automatically per schedule; call dates calculated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_MAINT_PLAN_CREATE',
  },
  {
    id: 'PM-EQ-001', module: 'PM', subModule: 'Equipment', industry: 'All',
    scenario: 'Equipment Master', testCase: 'Create equipment master IE01',
    preCond: 'Equipment category configured; functional location exists',
    steps: '1. IE01 → Enter equipment category\n2. Assign to functional location\n3. Enter manufacturer + serial number\n4. Assign to cost center\n5. Save',
    expected: 'Equipment master created; assigned to functional location; warranty data stored; measurement documents possible',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_EQUI_CREATE',
  },

  // ============================================================
  // HCM – HUMAN CAPITAL MANAGEMENT
  // ============================================================
  {
    id: 'HCM-PA-001', module: 'HCM', subModule: 'Personnel Administration', industry: 'All',
    scenario: 'New Hire', testCase: 'Create new employee PA40 Hiring Action',
    preCond: 'Personnel area; employee group/subgroup; payroll area configured',
    steps: '1. PA40 → Hiring action → Enter start date\n2. Infotype 0000 (Actions)\n3. Infotype 0001 (Org Assignment)\n4. Infotype 0002 (Personal Data)\n5. Infotype 0008 (Payroll)\n6. Save',
    expected: 'Employee number created; infotypes saved; payroll eligible from hire date; org chart updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_EMPLOYEE_ENQUEUE',
  },
  {
    id: 'HCM-PA-002', module: 'HCM', subModule: 'Personnel Administration', industry: 'All',
    scenario: 'Employee Transfer', testCase: 'Transfer employee between departments PA40',
    preCond: 'Active employee; new position available; PA40 authorization',
    steps: '1. PA40 → Transfer action → Enter employee\n2. Enter effective date\n3. Change Infotype 0001 (new org unit/position)\n4. Save',
    expected: 'Position change effective; old position vacant; cost center changed; payroll updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_EMPLOYEE_ENQUEUE',
  },
  {
    id: 'HCM-PA-003', module: 'HCM', subModule: 'Personnel Administration', industry: 'All',
    scenario: 'Employee Termination', testCase: 'Process employee termination PA40',
    preCond: 'Active employee; termination reason configured; final payroll run complete',
    steps: '1. PA40 → Termination action → Enter employee\n2. Enter termination date\n3. Enter termination reason\n4. PA30 → Delimit all active infotypes\n5. Save',
    expected: 'Employee status set to terminated; position vacated; payroll locked after last run; audit trail created',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_EMPLOYEE_ENQUEUE',
  },
  {
    id: 'HCM-PY-001', module: 'HCM', subModule: 'Payroll', industry: 'All',
    scenario: 'Payroll Run', testCase: 'Execute payroll PC00_M99_CALC',
    preCond: 'Active employees; payroll periods defined; infotype 0008 maintained',
    steps: '1. PC00_M99_CALC → Enter payroll area + period\n2. Test run (check results)\n3. Productive run\n4. Check payroll log',
    expected: 'Payroll calculated; gross/net pay computed; taxes deducted; payroll results stored in cluster RT',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'RFC_READ_TABLE on payroll clusters',
  },
  {
    id: 'HCM-TM-001', module: 'HCM', subModule: 'Time Management', industry: 'All',
    scenario: 'Time Recording', testCase: 'Record employee time CAT2',
    preCond: 'Employee with time management type; cost center assigned',
    steps: '1. CAT2 → Enter employee\n2. Enter hours by date and activity\n3. Send for approval\n4. Transfer to payroll',
    expected: 'Time entries saved; workflow to approver; upon approval, hours transferred to payroll and CO',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_CATS_RECORD',
  },
  {
    id: 'HCM-OM-001', module: 'HCM', subModule: 'Organizational Management', industry: 'All',
    scenario: 'Org Unit Creation', testCase: 'Create org unit and position PPOME',
    preCond: 'Organizational plan active; root org unit exists',
    steps: '1. PPOME → Open org chart\n2. Create new org unit\n3. Assign to parent org unit\n4. Create position under org unit\n5. Assign job and cost center\n6. Save',
    expected: 'Org unit created; position created and assigned; org chart updated; position can receive employee assignment',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_ORGOBJECT_CREATE',
  },

  // ============================================================
  // PS / WM / BASIS
  // ============================================================
  {
    id: 'PS-WBS-001', module: 'PS', subModule: 'Project System', industry: 'All',
    scenario: 'Project Creation', testCase: 'Create project structure CJ01',
    preCond: 'Project profile configured; network type',
    steps: '1. CJ01 → Enter project definition\n2. Add WBS elements hierarchy\n3. Set planned dates + responsible\n4. Assign budget\n5. Save + Release',
    expected: 'Project hierarchy created; WBS numbers generated; budget released; can receive cost postings',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PROJECT_MAINTAIN',
  },
  {
    id: 'PS-WBS-002', module: 'PS', subModule: 'Project System', industry: 'All',
    scenario: 'Project Budget', testCase: 'Assign and release project budget CJ30',
    preCond: 'Project with WBS; budget profile configured',
    steps: '1. CJ30 → Enter project\n2. Enter budget values per WBS\n3. CJ32 → Release budget\n4. CJ33 → Verify availability',
    expected: 'Budget released; availability control active; over-budget postings generate error/warning per tolerance',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_PS_BUDGET_PLAN_POST',
  },
  {
    id: 'WM-TO-001', module: 'WM', subModule: 'Warehouse Management', industry: 'All',
    scenario: 'Transfer Order Creation', testCase: 'Create TO from TR LT0A',
    preCond: 'Storage type/section/bin configured; transfer requirement exists',
    steps: '1. LT0A → Enter warehouse + transfer requirement\n2. Confirm quantities\n3. Assign destination bin\n4. Confirm TO',
    expected: 'Transfer order created; material moved to target bin; stock overview updated; GR/GI confirmed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_WHSE_TO_CREATE_FROM_TR',
  },
  {
    id: 'WM-PI-001', module: 'WM', subModule: 'Warehouse Management', industry: 'All',
    scenario: 'Warehouse Physical Inventory', testCase: 'Warehouse inventory LI01/LI20',
    preCond: 'Warehouse with stock; WM physical inventory active',
    steps: '1. LI01 → Create physical inventory doc for bin\n2. LI11 → Enter count\n3. LI20 → Post differences',
    expected: 'Bin stock adjusted; differences posted; IM stock synchronized with WM',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_WHSE_INVENT_CREATE',
  },
  {
    id: 'BASIS-USR-001', module: 'Basis', subModule: 'User Management', industry: 'All',
    scenario: 'User Creation', testCase: 'Create user SU01',
    preCond: 'System admin authorization; user type defined (dialog/service/system)',
    steps: '1. SU01 → Enter user ID\n2. Assign user type\n3. Assign roles/profiles\n4. Set password policy\n5. Set validity dates\n6. Save',
    expected: 'User created; can log in per system rules; authorizations checked via SU53; audit log created',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_USER_CREATE1',
  },
  {
    id: 'BASIS-USR-002', module: 'Basis', subModule: 'User Management', industry: 'All',
    scenario: 'Role Assignment', testCase: 'Assign role to user SU01',
    preCond: 'User exists; role exists and tested',
    steps: '1. SU01 → Enter user → Roles tab\n2. Add role\n3. Set validity dates\n4. Save\n5. Test via SU53',
    expected: 'Authorizations active; user can access assigned transactions; SU53 shows auth check passed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_USER_ACTGROUPS_ASSIGN',
  },
  {
    id: 'BASIS-TRAN-001', module: 'Basis', subModule: 'Transport Management', industry: 'All',
    scenario: 'Transport Request Export', testCase: 'Release and export transport STMS',
    preCond: 'Development system; transport request created; TMS configured',
    steps: '1. SE09/SE10 → Release transport\n2. STMS → Import queue\n3. Attach to transport route\n4. Export to target system',
    expected: 'Transport exported; objects in target system import queue; no import errors',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'CTS_API_CHANGE_REQUEST_GET',
  },
  {
    id: 'BASIS-AUTH-001', module: 'Basis', subModule: 'Authorization', industry: 'All',
    scenario: 'Authorization Check', testCase: 'Test authorization via SU53',
    preCond: 'User attempted access; authorization error occurred',
    steps: '1. After failed transaction → SU53\n2. Display last failed authorization check\n3. Identify missing auth object\n4. Add to role via PFCG',
    expected: 'Missing auth object identified; role updated; user can access after role re-generation',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'SUSR_USER_AUTH_CHECK',
  },
  {
    id: 'BASIS-PERF-001', module: 'Basis', subModule: 'Performance', industry: 'All',
    scenario: 'System Performance Check', testCase: 'Monitor system performance SM66/SM50',
    preCond: 'System under load; admin authorization',
    steps: '1. SM66 → View global work processes\n2. Identify long-running processes\n3. SM50 → Local process monitor\n4. AL08 → User list + response times',
    expected: 'Response times within SLA (<3s dialog); no locked work processes; CPU/memory within threshold; no DB locks',
    priority: 'Medium', testType: 'Performance', autoFeasibility: 'Low', bapi: 'RFC_READ_TABLE on SM66 data',
  },

  // ============================================================
  // INDUSTRY: PHARMA / LIFE SCIENCES
  // ============================================================
  {
    id: 'PH-MM-001', module: 'MM', subModule: 'Batch Management', industry: 'Pharma',
    scenario: 'Batch Creation', testCase: 'Create batch with classification MSC1N',
    preCond: 'Batch management active; classification system configured; pharma-specific class maintained',
    steps: '1. MSC1N → Enter material + plant\n2. Create batch with batch number\n3. Assign classification values (MFG date, EXP date, CoA number)\n4. Save',
    expected: 'Batch created with correct classification; expiry date set; shelf life check active; GxP audit trail',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_BATCH_CREATE',
  },
  {
    id: 'PH-MM-002', module: 'MM', subModule: 'Batch Management', industry: 'Pharma',
    scenario: 'FEFO Goods Issue', testCase: 'FEFO-based goods issue for pharma',
    preCond: 'Multiple batches with different expiry dates; FEFO active in storage location',
    steps: '1. MIGO → Goods Issue → Production Order\n2. System automatically proposes earliest expiry batch\n3. Confirm\n4. Post',
    expected: 'Oldest batch (earliest expiry) consumed first; FEFO rule enforced; batch where-used record updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'PH-MM-003', module: 'MM', subModule: 'Compliance', industry: 'Pharma',
    scenario: 'GDP Storage Condition Check', testCase: 'Temperature monitoring integration',
    preCond: 'IoT sensor data integration; material with storage conditions in classification',
    steps: '1. Receive GDP alert from IoT system\n2. Quarantine affected batch\n3. Create quality notification\n4. Run risk assessment',
    expected: 'Batch quarantined automatically; GDP deviation notification created; inventory blocked pending investigation',
    priority: 'High', testType: 'Integration', autoFeasibility: 'Low', bapi: 'Custom RFC / BAdI MBMB_CHECK_LINE',
  },
  {
    id: 'PH-QM-001', module: 'QM', subModule: 'Quality', industry: 'Pharma',
    scenario: 'Batch Release', testCase: 'GMP batch release inspection lot QA11',
    preCond: 'Batch received; inspection lot triggered; inspection plan with pharma characteristics',
    steps: '1. QA11 → Usage decision on inspection lot\n2. Attach CoA\n3. QA decision = Accept (Code A)\n4. Stock posts to unrestricted',
    expected: 'Batch released for distribution; stock status changes; batch classification updated with UD date; audit trail per 21 CFR Part 11',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_INSPLOT_USAGEDECISION',
  },
  {
    id: 'PH-QM-002', module: 'QM', subModule: 'Quality', industry: 'Pharma',
    scenario: 'Deviation / CAPA', testCase: 'Quality notification for deviation QM01',
    preCond: 'Production deviation identified; QM notification type D configured',
    steps: '1. QM01 → Create deviation notification\n2. Enter root cause\n3. Assign CAPA tasks\n4. Set target dates\n5. 5-Why analysis attachment',
    expected: 'CAPA record created; tasks assigned with deadlines; escalation on overdue; closed with effectiveness check',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_QUALNOT_CREATE',
  },
  {
    id: 'PH-SD-001', module: 'SD', subModule: 'Serialization', industry: 'Pharma',
    scenario: 'Drug Serialization', testCase: 'Serialize product at line (ATTP)',
    preCond: 'Serialization active; serial number profile on material; ATTP connected',
    steps: '1. VL02N → Delivery\n2. Assign serial numbers to delivery items\n3. Confirm serial numbers\n4. Post GI\n5. ATTP event triggered',
    expected: 'Serial numbers assigned; ATTP commissioning event sent; GS1 data matrix generated; pedigree chain started',
    priority: 'High', testType: 'Integration', autoFeasibility: 'Medium', bapi: 'BAPI_SERIAL_CREATE',
  },
  {
    id: 'PH-FI-001', module: 'FI', subModule: 'Revenue', industry: 'Pharma',
    scenario: 'Contract Manufacturing Revenue', testCase: 'Revenue recognition for CMO billing',
    preCond: 'Contract manufacturing agreement; milestone billing plan; IFRS 15 configured',
    steps: '1. Milestone reached → billing plan triggers\n2. VF01 → Create milestone invoice\n3. Revenue recognition event (VBREVK)\n4. FI posting',
    expected: 'Revenue recognized at correct IFRS 15 obligation milestone; deferred revenue adjusted; correct period posting',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_BILLINGDOC_CREATE',
  },
  {
    id: 'PH-MM-004', module: 'MM', subModule: 'Batch Management', industry: 'Pharma',
    scenario: 'Batch Recall', testCase: 'Execute batch recall / where-used MB56',
    preCond: 'Distributed batches with batch information cockpit active; customer deliveries posted',
    steps: '1. MB56 → Enter material + batch number\n2. Execute where-used list\n3. Identify all distribution points\n4. Create returns orders for customer batches',
    expected: 'Complete where-used chain visible; customer batches identified; returns initiated; regulatory notification created; batch blocked in all warehouses',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_BATCH_SEARCH',
  },

  // ============================================================
  // INDUSTRY: MANUFACTURING
  // ============================================================
  {
    id: 'MFG-PP-001', module: 'PP', subModule: 'Production', industry: 'Manufacturing',
    scenario: 'Discrete Manufacturing Order', testCase: 'End-to-end discrete manufacturing',
    preCond: 'BOM + routing defined; work centers with capacity; MRP planned orders exist',
    steps: '1. CO40 → Convert planned order to production order\n2. CO02 → Release order\n3. Confirm operations CO11N\n4. GI components MIGO 261\n5. GR finished goods MIGO 101\n6. Settle order CO88',
    expected: 'End-to-end flow complete; actual costs vs standard variance < 2%; finished goods in stock; order settled',
    priority: 'High', testType: 'Integration', autoFeasibility: 'High', bapi: 'BAPI_PRODORD_CREATE + BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'MFG-PP-002', module: 'PP', subModule: 'Production', industry: 'Manufacturing',
    scenario: 'Repetitive Manufacturing', testCase: 'Run schedule for repetitive MFBF',
    preCond: 'Repetitive manufacturing profile; production line; rate routing',
    steps: '1. MF50 → Enter production line + period\n2. Enter quantity per day\n3. MFBF → Backflush confirmation',
    expected: 'Components backflushed; finished goods posted; no explicit production order; line schedule updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_REPMANCONF_CREATE',
  },
  {
    id: 'MFG-PP-003', module: 'PP', subModule: 'Capacity', industry: 'Manufacturing',
    scenario: 'Capacity Leveling', testCase: 'Capacity evaluation CM01/CM21',
    preCond: 'Production orders with operations; work center capacity defined',
    steps: '1. CM01 → Enter work center + time period\n2. View overload situations\n3. CM21 → Reschedule operations\n4. Resolve overloads',
    expected: 'Overloads resolved; operations rescheduled within constraints; production schedule feasible',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Low', bapi: 'BAPI_CAPACITY_REQUIREMENTS_GET',
  },
  {
    id: 'MFG-QM-001', module: 'QM', subModule: 'Quality', industry: 'Manufacturing',
    scenario: 'In-Process Quality Check', testCase: 'Inspection at production operation',
    preCond: 'Inspection type 03 (in-process) active; inspection plan at routing operation',
    steps: '1. Trigger inspection at operation CO11N\n2. QE11 → Record results\n3. Defect recording\n4. Rework order if needed',
    expected: 'In-process inspection recorded; defect triggers rework; quality gate prevents downstream operation if failed',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_QMEL_CREATE',
  },
  {
    id: 'MFG-MM-001', module: 'MM', subModule: 'Kanban', industry: 'Manufacturing',
    scenario: 'Kanban Replenishment', testCase: 'Kanban signal triggers replenishment PK21',
    preCond: 'Kanban control cycle configured; kanban board active',
    steps: '1. PK21 → Set kanban to empty (signal)\n2. System creates PR/TR automatically\n3. Goods sent to kanban bin\n4. PK21 → Set to full',
    expected: 'Replenishment triggered; goods received at kanban bin; bin status updated; loop continues',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_KANBAN_SIGNAL',
  },
  {
    id: 'MFG-CO-001', module: 'CO', subModule: 'Costing', industry: 'Manufacturing',
    scenario: 'Actual Cost Component Split', testCase: 'Review actual cost components KKB5',
    preCond: 'Product cost collector; period-end CO run complete; COGS split active',
    steps: '1. KKB5 → Enter material + period\n2. Review cost component split (material/labor/overhead)\n3. Compare vs standard',
    expected: 'Actual cost by component visible; variance by type (price/quantity/efficiency); decision support for pricing',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Low', bapi: 'BAPI_COSTESTIMATE_DISPLAY',
  },
  {
    id: 'MFG-PP-004', module: 'PP', subModule: 'Production', industry: 'Manufacturing',
    scenario: 'Process Order', testCase: 'Create process order for process manufacturing COR1',
    preCond: 'Recipe/master recipe defined; process order type configured; production version active',
    steps: '1. COR1 → Enter material + plant + production version\n2. Enter quantity + dates\n3. Calculate costs\n4. Release\n5. Print process instruction sheet',
    expected: 'Process order created; phases and operations from master recipe assigned; GMP-relevant data visible; component list generated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PROCORD_CREATE',
  },

  // ============================================================
  // INDUSTRY: RETAIL
  // ============================================================
  {
    id: 'RT-SD-001', module: 'SD', subModule: 'Retail', industry: 'Retail',
    scenario: 'Article Master Creation', testCase: 'Create retail article MM41',
    preCond: 'Merchandise category configured; retail site',
    steps: '1. MM41 → Enter EAN/article number\n2. Select merchandise category\n3. Maintain purchase + sales prices\n4. Assign to site/storage location\n5. Save',
    expected: 'Article created; price ladder maintained; listing active for assigned sites; POS can sell',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_MATERIAL_SAVEDATA',
  },
  {
    id: 'RT-SD-002', module: 'SD', subModule: 'Retail', industry: 'Retail',
    scenario: 'Promotion Pricing', testCase: 'Create promotional price condition VK11',
    preCond: 'Promotion condition type maintained; validity date range',
    steps: '1. VK11 → Promotion condition type\n2. Enter article + validity period\n3. Enter promo price\n4. Assign sales org',
    expected: 'Promotional price active during validity; overrides regular price; margin analysis shows promo impact',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PRICES_CONDITIONS',
  },
  {
    id: 'RT-MM-001', module: 'MM', subModule: 'Replenishment', industry: 'Retail',
    scenario: 'Store Replenishment', testCase: 'Automatic store replenishment MRP/Allocation',
    preCond: 'Store as plant; safety stock defined; supplier info record',
    steps: '1. MD01 → MRP for store plant\n2. Review purchase proposals\n3. Allocation from DC to store\n4. MIGO → GR at store',
    expected: 'Store stock replenished; reorder point logic respected; allocation quantities correct',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'RT-FI-001', module: 'FI', subModule: 'Financial', industry: 'Retail',
    scenario: 'POS Reconciliation', testCase: 'Reconcile POS daily totals',
    preCond: 'POS system integrated; IDoc configured for daily upload',
    steps: '1. Daily POS IDocs arrive\n2. RFWMBP00 → Process POS upload\n3. Verify tender types (cash, card)\n4. Reconcile vs bank statement',
    expected: 'POS totals posted to FI; cash account balanced; discrepancies flagged; day-end journal created',
    priority: 'High', testType: 'Integration', autoFeasibility: 'Medium', bapi: 'IDoc WPUBON01 / BAPI_POSORDER_SAVE',
  },
  {
    id: 'RT-MM-002', module: 'MM', subModule: 'Inventory', industry: 'Retail',
    scenario: 'Markdown Management', testCase: 'Clearance markdown on slow-moving stock',
    preCond: 'Stock with low sell-through; markdown authorization',
    steps: '1. Create markdown price condition VK11\n2. Reduce price for clearance period\n3. Monitor sell-through\n4. Write-down remaining stock if needed',
    expected: 'Markdown price active; sell-through improves; residual stock written down with FI impact; cleared from assortment',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_PRICES_CONDITIONS',
  },
  {
    id: 'RT-SD-003', module: 'SD', subModule: 'Retail', industry: 'Retail',
    scenario: 'Merchandise Category Listing', testCase: 'List article for new store MM42',
    preCond: 'Article master exists; new store opened; listing conditions configured',
    steps: '1. MM42 → Enter article + merchandise category\n2. Add new store/site to listing\n3. Set listing validity dates\n4. Generate de-listing for exited stores\n5. Save',
    expected: 'Article listed at new store; available for replenishment and POS; de-listed stores locked from ordering',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_MATERIAL_SAVEDATA',
  },

  // ============================================================
  // INDUSTRY: BANKING / FINANCIAL SERVICES
  // ============================================================
  {
    id: 'BNK-TR-001', module: 'FI', subModule: 'Treasury', industry: 'Banking',
    scenario: 'Cash Pool Header', testCase: 'Configure and run cash pooling',
    preCond: 'House bank; bank accounts; FSCM configured',
    steps: '1. FI12 → Configure bank account\n2. F110 → Payment run across pool accounts\n3. Notional pooling calculation\n4. Interest posting',
    expected: 'Cash pool balances consolidated; interest calculated at group level; intercompany clearing entries posted',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_BANK_CREATE',
  },
  {
    id: 'BNK-CM-001', module: 'FI', subModule: 'Credit Management', industry: 'Banking',
    scenario: 'Credit Exposure Calculation', testCase: 'FI-AR credit exposure UKM',
    preCond: 'UKM (SAP Credit Management) active; customer credit segments defined',
    steps: '1. UKM_CASE → Open credit case\n2. Review exposure (open orders + open AR)\n3. Credit decision\n4. Update credit limit',
    expected: 'Exposure calculated correctly; credit decisions logged; breach of limit blocks orders automatically',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_CREDITMANAGEMENT_GETDETAI',
  },
  {
    id: 'BNK-TR-002', module: 'FI', subModule: 'Treasury', industry: 'Banking',
    scenario: 'Bank Statement Import', testCase: 'Import bank statement FF_5',
    preCond: 'BAI2/MT940 file from bank; house bank configured',
    steps: '1. FF_5 → Import bank statement file\n2. System matches against open items\n3. Resolve exceptions\n4. Post',
    expected: 'Bank statement imported; open items cleared; unmatched items parked for review; bank balance reconciled',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PAYMENT_MAINTAIN',
  },
  {
    id: 'BNK-FI-001', module: 'FI', subModule: 'FSCM', industry: 'Banking',
    scenario: 'Collection Worklist', testCase: 'SAP Collections Management',
    preCond: 'FIN-FSCM-COL active; customer segments; credit analyst assigned',
    steps: '1. F_UKM_COLL_AUTO → Generate worklist\n2. Analyst reviews overdue customers\n3. Create contact\n4. Promise to pay',
    expected: 'Worklist generated by risk; contact logged; promise-to-pay created; escalation on broken promise',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_UKMLIMIT_GETLIST',
  },
  {
    id: 'BNK-TR-003', module: 'FI', subModule: 'Treasury', industry: 'Banking',
    scenario: 'Hedge Accounting', testCase: 'Create FX forward contract in Treasury',
    preCond: 'SAP Treasury and Risk Management active; hedge designation configured',
    steps: '1. FTR_CREATE → Create FX forward transaction\n2. Assign hedge relationship\n3. Effectiveness test\n4. Mark-to-market valuation at period end',
    expected: 'FX forward created; hedge relationship documented; MTM valuation posted to OCI; effectiveness documented per IAS 39',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_TR_DEAL_CREATE',
  },

  // ============================================================
  // INDUSTRY: OIL & GAS
  // ============================================================
  {
    id: 'OG-IS-001', module: 'MM', subModule: 'IS-Oil', industry: 'Oil & Gas',
    scenario: 'Tank Management', testCase: 'Tank inventory reconciliation',
    preCond: 'IS-Oil configured; tank as storage bin; quantity conversion factors',
    steps: '1. Record tank dip measurement\n2. Convert volume to mass at ambient temperature\n3. Compare vs system quantity\n4. Post variance',
    expected: 'Tank book stock matches physical; temperature/density correction applied; variance within tolerance posted',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_GOODSMVT_CREATE',
  },
  {
    id: 'OG-SD-001', module: 'SD', subModule: 'Trading', industry: 'Oil & Gas',
    scenario: 'Spot Deal', testCase: 'Create commodity spot deal',
    preCond: 'Commodity management active; pricing based on index (Platts)',
    steps: '1. Create spot sales contract\n2. Price formula linked to Platts index\n3. Nominate delivery\n4. Create delivery + invoice',
    expected: 'Price determined from external index; P&L calculated; mark-to-market valuation possible',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Low', bapi: 'BAPI_SALESCONTRACT_CREATE',
  },
  {
    id: 'OG-PM-001', module: 'PM', subModule: 'Maintenance', industry: 'Oil & Gas',
    scenario: 'Safety-Critical Equipment', testCase: 'Preventive maintenance for SIL-rated equipment',
    preCond: 'Equipment with SIL classification; preventive maintenance plan configured',
    steps: '1. IP10 → Maintenance plan for safety valve\n2. IP30 → Schedule plan\n3. Proof test work order created automatically\n4. Complete with measurement',
    expected: 'Proof test completed; functional test result recorded; equipment effectiveness calculated; SIL validation maintained',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_ALM_ORDER_MAINTAIN',
  },

  // ============================================================
  // INDUSTRY: HEALTHCARE
  // ============================================================
  {
    id: 'HC-IS-001', module: 'IS-H', subModule: 'Patient Management', industry: 'Healthcare',
    scenario: 'Patient Admission', testCase: 'Admit patient IS-H NPA1',
    preCond: 'IS-H (Industry Solution Healthcare) configured; ward/bed available',
    steps: '1. NPA1 → Patient admission\n2. Search/create patient master\n3. Select ward + bed\n4. Enter diagnosis\n5. Confirm insurance',
    expected: 'Patient admitted; bed occupied; insurance verified; case created; cost object (case) for billing',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PAT_CASE_CREATEFROMDATA',
  },
  {
    id: 'HC-IS-002', module: 'IS-H', subModule: 'Billing', industry: 'Healthcare',
    scenario: 'Case Billing', testCase: 'Bill patient case after discharge NLB1',
    preCond: 'Patient discharged; DRG coding complete; insurance contract',
    steps: '1. NLB1 → Case billing\n2. DRG code determines case rate\n3. Generate insurance invoice\n4. Post to FI',
    expected: 'Case invoiced at correct DRG rate; insurance co-pay split; patient portion billed; FI revenue posted',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_BILLINGDOC_CREATE',
  },
  {
    id: 'HC-IS-003', module: 'IS-H', subModule: 'Patient Management', industry: 'Healthcare',
    scenario: 'Patient Discharge', testCase: 'Process patient discharge NPA3',
    preCond: 'Active patient admission exists; discharge order from physician',
    steps: '1. NPA3 → Enter patient case\n2. Enter discharge date + time\n3. Enter discharge reason\n4. Confirm diagnoses + procedures (ICD/OPS)\n5. Release case for billing',
    expected: 'Case status = discharged; bed released; DRG case grouper triggered; billing case ready for invoicing',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_PAT_CASE_CREATEFROMDATA',
  },

  // ============================================================
  // INDUSTRY: UTILITIES
  // ============================================================
  {
    id: 'UT-IS-001', module: 'IS-U', subModule: 'Device Management', industry: 'Utilities',
    scenario: 'Meter Reading', testCase: 'Import meter reading with IDoc',
    preCond: 'IS-U configured; meter device; reading order',
    steps: '1. EL26 → Enter reading order\n2. Import meter reading values (file/IDoc)\n3. Plausibility check\n4. Post reading',
    expected: 'Meter reading posted; consumption calculated; billing document triggered; unusual consumption flagged',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'IDoc MREQAD01',
  },
  {
    id: 'UT-IS-002', module: 'IS-U', subModule: 'Billing', industry: 'Utilities',
    scenario: 'Utility Billing Run', testCase: 'EA10 billing run',
    preCond: 'Contract accounts; reading posted; rate category configured',
    steps: '1. EA10 → Select billing unit\n2. Set billing period\n3. Run billing\n4. Review simulation\n5. Post',
    expected: 'Bills generated with correct rate; taxes applied; payment due date set; dunning level reset if paid',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_EABL_GET_LIST',
  },
  {
    id: 'UT-IS-003', module: 'IS-U', subModule: 'Device Management', industry: 'Utilities',
    scenario: 'Meter Installation', testCase: 'Install meter at service point EDIB',
    preCond: 'Service point exists; meter device ready; IS-U device management active',
    steps: '1. EDIB → Service order for installation\n2. Enter service point + device\n3. Record installation date + meter reading\n4. Confirm installation',
    expected: 'Meter installed at service point; initial reading recorded; billing cycle starts; device history updated',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_DEVICE_INSTALL',
  },

  // ============================================================
  // INDUSTRY: PUBLIC SECTOR
  // ============================================================
  {
    id: 'PS-GM-001', module: 'FI', subModule: 'Grants Management', industry: 'Public Sector',
    scenario: 'Grant Budget', testCase: 'Allocate grant budget GM_BDGT',
    preCond: 'Grants Management active; sponsored program; grant master',
    steps: '1. Create grant master GMP1\n2. Assign sponsored program\n3. Allocate budget\n4. Post expenditures\n5. Generate grant billing',
    expected: 'Budget allocated; expenditures tracked against grant; billing to sponsor generated; compliance reports produced',
    priority: 'High', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_GM_BUDGET_POST',
  },
  {
    id: 'PS-FM-001', module: 'FI', subModule: 'Funds Management', industry: 'Public Sector',
    scenario: 'Budget Control', testCase: 'FM budget availability check',
    preCond: 'Funds Management active; fund center; commitment item',
    steps: '1. FMBB → Enter budget\n2. Release budget\n3. Purchase order posts against fund\n4. Over-budget scenario test',
    expected: 'Budget check triggers on over-commitment; error message per tolerance; budget manager notified',
    priority: 'High', testType: 'Functional', autoFeasibility: 'High', bapi: 'BAPI_FM_BUDGET_POST',
  },
  {
    id: 'PS-FM-002', module: 'FI', subModule: 'Funds Management', industry: 'Public Sector',
    scenario: 'Year-End Budget Carryforward', testCase: 'Carry forward uncommitted budget FMCYCB',
    preCond: 'Fiscal year end approaching; FM active; carryforward rules configured',
    steps: '1. FMCYCB → Enter sending + receiving fiscal year\n2. Select fund centers\n3. Simulation run\n4. Execute carryforward',
    expected: 'Uncommitted budget carried forward to next year; expired commitments purged; audit report generated; budget continuity maintained',
    priority: 'Medium', testType: 'Functional', autoFeasibility: 'Medium', bapi: 'BAPI_FM_BUDGET_POST',
  },

  // ============================================================
  // END-TO-END INTEGRATION SCENARIOS
  // ============================================================
  {
    id: 'INT-P2P-001', module: 'MM', subModule: 'Procure to Pay', industry: 'All',
    scenario: 'Procure-to-Pay End-to-End', testCase: 'Complete P2P flow PR→PO→GR→MIRO→F110',
    preCond: 'Vendor master; material master; GL accounts; bank; all authorizations',
    steps: '1. ME51N → Create PR\n2. Approve PR (workflow)\n3. ME21N → Create PO referencing PR\n4. MIGO → Post GR against PO\n5. MIRO → Post vendor invoice (3-way match)\n6. F110 → Payment run\n7. Verify vendor balance = 0',
    expected: 'P2P cycle complete; no open items; vendor paid; audit trail from PR through payment; FI balanced',
    priority: 'High', testType: 'Integration', autoFeasibility: 'High', bapi: 'BAPI_PR_CREATE + BAPI_PO_CREATE1 + BAPI_GOODSMVT_CREATE + BAPI_INCOMINGINVOICE_CREATE + BAPI_PAYMENT_MAINTAIN',
  },
  {
    id: 'INT-O2C-001', module: 'SD', subModule: 'Order to Cash', industry: 'All',
    scenario: 'Order-to-Cash End-to-End', testCase: 'Complete O2C flow VA01→VL01N→VF01→FI',
    preCond: 'Customer master; material in stock; pricing; billing; bank',
    steps: '1. VA01 → Create standard sales order OR\n2. VL01N → Create outbound delivery\n3. VL02N → Post goods issue\n4. VF01 → Create invoice\n5. F-28 → Post incoming payment\n6. Verify customer balance = 0',
    expected: 'O2C cycle complete; stock reduced; revenue recognized; customer paid; FI balanced; no open items',
    priority: 'High', testType: 'Integration', autoFeasibility: 'High', bapi: 'BAPI_SALESORDER_CREATEFROMDAT2 + BAPI_OUTB_DELIVERY_CREATE_SLS + BAPI_BILLINGDOC_CREATE + BAPI_ACC_DOCUMENT_POST',
  },
  {
    id: 'INT-P2P-002', module: 'PP', subModule: 'Plan to Produce', industry: 'All',
    scenario: 'Plan-to-Produce End-to-End', testCase: 'Complete P2P flow MD01→CO01→CO11N→MIGO→CO88',
    preCond: 'BOM; routing; work centers; MRP active; material master',
    steps: '1. MD01 → Run MRP for plant\n2. CO40 → Convert planned order\n3. CO02 → Release production order\n4. MIGO 261 → Issue components\n5. CO11N → Confirm operations\n6. MIGO 101 → Receive finished goods\n7. CO88 → Settle order',
    expected: 'FG in stock; production costs settled; variance < tolerance; order status TECO and SETC; FI balanced',
    priority: 'High', testType: 'Integration', autoFeasibility: 'High', bapi: 'BAPI_PRODORD_CREATE + BAPI_GOODSMVT_CREATE + BAPI_ORDER_SETTLE',
  },
  {
    id: 'INT-HTR-001', module: 'HCM', subModule: 'Hire to Retire', industry: 'All',
    scenario: 'Hire-to-Retire End-to-End', testCase: 'Complete HR flow hire→payroll→termination',
    preCond: 'Personnel area; payroll area; org structure; all HCM authorizations',
    steps: '1. PA40 → Hire employee\n2. PPOME → Assign to org unit\n3. CAT2 → Record time\n4. PC00_M99_CALC → Run payroll\n5. PA40 → Termination action\n6. Final payroll run',
    expected: 'Employee lifecycle complete; payroll accurate throughout; termination benefits calculated; final payroll posted; personnel file closed',
    priority: 'High', testType: 'Integration', autoFeasibility: 'Medium', bapi: 'BAPI_EMPLOYEE_ENQUEUE + BAPI_CATS_RECORD',
  },
  {
    id: 'INT-R2R-001', module: 'FI', subModule: 'Record to Report', industry: 'All',
    scenario: 'Record-to-Report End-to-End', testCase: 'Month-end close sequence',
    preCond: 'All modules posting complete; no open items in GR/IR; asset depreciation ready',
    steps: '1. AFAB → Run depreciation\n2. FAGL_FC_VAL → FX revaluation\n3. KSV5 → CC distribution/assessment\n4. CO88 → Settle production orders\n5. OB52 → Close current period\n6. S_ALR_87012284 → Financial statement',
    expected: 'All period-end postings complete; P&L and BS balanced; prior period locked; financial statements generated and export-ready',
    priority: 'High', testType: 'Integration', autoFeasibility: 'Medium', bapi: 'Multiple BAPIs per step',
  },

  // ============================================================
  // REGRESSION TEST CASES
  // ============================================================
  {
    id: 'REG-FI-001', module: 'FI', subModule: 'General Ledger', industry: 'All',
    scenario: 'Post-Upgrade GL Posting Regression', testCase: 'Verify GL document posting after system upgrade',
    preCond: 'System upgrade completed; regression environment available',
    steps: '1. Execute F-02 with known test data\n2. Verify document number generated\n3. Check posting date, amounts, account assignments\n4. Compare with pre-upgrade baseline',
    expected: 'Document posting behavior identical to pre-upgrade baseline; number range, balance, and FI fields all match expected values',
    priority: 'High', testType: 'Regression', autoFeasibility: 'High', bapi: 'BAPI_ACC_GL_POSTING_POST',
  },
  {
    id: 'REG-MM-001', module: 'MM', subModule: 'Purchasing', industry: 'All',
    scenario: 'PO Creation Regression', testCase: 'Verify purchase order creation after patch',
    preCond: 'Patch applied; regression environment; known vendor + material data',
    steps: '1. ME21N → Create PO with standard test data\n2. Verify all tabs populated correctly\n3. Release PO\n4. Check commitment created in CO\n5. Compare fields with pre-patch baseline',
    expected: 'PO creation behavior identical to pre-patch; all field validations pass; commitment amount correct; no new error messages',
    priority: 'High', testType: 'Regression', autoFeasibility: 'High', bapi: 'BAPI_PO_CREATE1',
  },
  {
    id: 'REG-SD-001', module: 'SD', subModule: 'Sales Order', industry: 'All',
    scenario: 'Pricing Regression', testCase: 'Verify pricing determination after customizing change',
    preCond: 'Pricing customizing changed; known customer/material/price condition data',
    steps: '1. VA01 → Create sales order with known customer + material\n2. Record pricing conditions determined\n3. Compare with expected price from baseline\n4. Check all condition types in analysis',
    expected: 'Price determined exactly as per baseline; no unexpected condition types added/removed; net price matches tolerance < 0.01%',
    priority: 'High', testType: 'Regression', autoFeasibility: 'High', bapi: 'BAPI_SALESORDER_CREATEFROMDAT2',
  },
  {
    id: 'REG-PAY-001', module: 'HCM', subModule: 'Payroll', industry: 'All',
    scenario: 'Payroll Regression', testCase: 'Verify payroll results after tax table update',
    preCond: 'Tax table updated; test employee with known wage types; parallel payroll run',
    steps: '1. Run payroll for test employee (PC00_M99_CALC)\n2. Extract results from cluster RT\n3. Compare net pay, tax deductions vs expected\n4. Reconcile any variance',
    expected: 'Net pay within expected range post tax update; statutory deductions recalculated correctly; no dump or inconsistency in payroll log',
    priority: 'High', testType: 'Regression', autoFeasibility: 'Medium', bapi: 'RFC_READ_TABLE on payroll clusters',
  },

];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

const MODULES_V2 = ['FI', 'CO', 'MM', 'SD', 'PP', 'QM', 'PM', 'HCM', 'PS', 'WM', 'Basis', 'IS-H', 'IS-U'] as const;

const INDUSTRIES_V2: Industry[] = [
  'All', 'Pharma', 'Manufacturing', 'Retail',
  'Banking', 'Oil & Gas', 'Healthcare', 'Utilities', 'Public Sector',
];

function filterTestCasesV2(params: {
  module?: string;
  industry?: string;
  priority?: Priority;
  testType?: TestType;
  search?: string;
  autoFeasibility?: AutoFeasibility;
}): TestCase[] {
  return SAP_TEST_CASES_V2.filter(tc => {
    if (params.module && params.module !== 'All' && tc.module !== params.module) return false;
    if (params.industry && params.industry !== 'All' && tc.industry !== params.industry && tc.industry !== 'All') return false;
    if (params.priority && tc.priority !== params.priority) return false;
    if (params.testType && tc.testType !== params.testType) return false;
    if (params.autoFeasibility && tc.autoFeasibility !== params.autoFeasibility) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      return (
        tc.id.toLowerCase().includes(q) ||
        tc.scenario.toLowerCase().includes(q) ||
        tc.testCase.toLowerCase().includes(q) ||
        tc.bapi.toLowerCase().includes(q) ||
        tc.subModule.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

function getStatsV2() {
  const byModule: Record<string, number> = {};
  const byPriority: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const byAutoFeasibility: Record<string, number> = {};

  for (const tc of SAP_TEST_CASES_V2) {
    byModule[tc.module] = (byModule[tc.module] || 0) + 1;
    byPriority[tc.priority] = (byPriority[tc.priority] || 0) + 1;
    byType[tc.testType] = (byType[tc.testType] || 0) + 1;
    byAutoFeasibility[tc.autoFeasibility] = (byAutoFeasibility[tc.autoFeasibility] || 0) + 1;
  }

  return {
    total: SAP_TEST_CASES_V2.length,
    byModule,
    byPriority,
    byType,
    byAutoFeasibility,
    highAuto: SAP_TEST_CASES_V2.filter(tc => tc.autoFeasibility === 'High').length,
  };
}
