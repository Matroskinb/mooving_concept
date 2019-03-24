export abstract class HealthableAbstract {
    
    protected health: number;
    
    public changeHealth(amount: number): void {
        this.health += amount;
    }

    public getHealth() {
        return this.health;
    }
}
