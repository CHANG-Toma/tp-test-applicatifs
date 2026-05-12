// PARTIE 3 - Tests FONCTIONNELS (vue utilisateur).

import { describe, it, expect } from "vitest";
import { TaskManager } from "../src/taskManager.js";
import { TaskNotFoundError } from "../src/errors.js";

describe("Fonctionnels", () => {
  it("creer une tache la rend listable", () => {
    const mgr = new TaskManager();
    mgr.createTask({ title: "Aller a la salle de sport" });
    const titres = mgr.listTasks().map((t) => t.title);
    expect(titres).toContain("Aller a la salle de sport");
  });

  it("marker terminee change les stats", () => {
    const mgr = new TaskManager();
    mgr.createTask({ title: "A faire" });
    mgr.createTask({ title: "Aussi a faire" });
    mgr.markDone(1);
    const stats = mgr.getStats();
    expect(stats.done).toBe(1);
    expect(stats.todo).toBe(1);
  });

  it("liste triee par priorite descendante", () => {
    const mgr = new TaskManager();
    mgr.createTask({ title: "Acheter du pain", priority: "low" });
    mgr.createTask({ title: "Reviser pytest", priority: "high" });
    mgr.createTask({ title: "Push GitHub", priority: "medium" });
    const priorites = mgr.listTasks({ sortBy: "priority" }).map((t) => t.priority);
    expect(priorites).toEqual(["high", "medium", "low"]);
  });

  it("getTask sur id inexistant leve TaskNotFoundError", () => {
    const mgr = new TaskManager();
    expect(() => mgr.getTask(999)).toThrow(TaskNotFoundError);
  });

  // Partie 4 - Tests de regression.
  it("le filtre status done ne renvoie que des taches terminees", () => {
    const mgr = new TaskManager();
    mgr.createTask({ title: "En cours" });
    mgr.createTask({ title: "Terminee une" });
    mgr.createTask({ title: "Terminee deux" });
    mgr.markDone(2);
    mgr.markDone(3);

    const liste = mgr.listTasks({ statusFilter: "done" });
    expect(liste.length).toBe(2);
    expect(liste.every((t) => t.status === "done")).toBe(true);
    expect(liste.map((t) => t.id).sort()).toEqual([2, 3]);
  });
});
