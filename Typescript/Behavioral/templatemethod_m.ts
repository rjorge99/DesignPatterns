class AuditTrail {
    record() {
        console.log('Audit...');
    }
}

abstract class Task {
    private auditTrail: AuditTrail;

    constructor(auditTrail: AuditTrail) {
        this.auditTrail = auditTrail;
    }

    execute() {
        this.auditTrail.record();
        this.doExecute();
    }

    protected abstract doExecute(): void;
}

class TransferMoney extends Task {
    protected doExecute(): void {
        console.log('Transferring money...');
    }
}

class GenerateReport extends Task {
    protected doExecute(): void {
        console.log('Generating report...');
    }
}

const transferMoney = new TransferMoney(new AuditTrail());
transferMoney.execute();

const generateReport = new GenerateReport(new AuditTrail());
generateReport.execute();
