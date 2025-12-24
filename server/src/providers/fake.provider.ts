export class FakeProvider {
  private sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async send(payload: { to: string; content: string }) {
    const delay = 300 + Math.floor(Math.random() * 1200);
    await this.sleep(delay);

    const failChance = 0.25;
    if (Math.random() < failChance) {
      throw new Error("Provider failed randomly");
    }

    return { ok: true };
  }
}
