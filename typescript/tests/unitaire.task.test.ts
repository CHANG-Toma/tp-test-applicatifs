// PARTIE 1 - Premier test vert : tests UNITAIRES sur la classe Task.
// Pattern AAA : Arrange / Act / Assert.

import { describe, it, expect } from "vitest";
import { Task } from "../src/task.js";

describe("Task (unitaire)", () => {
  it("se cree avec un titre", () => {
    // Arrange
    const titre = "Faire les courses";
    // Act
    const tache = new Task({ id: 1, title: titre });
    // Assert
    expect(tache.title).toBe(titre);
  });

  it("garde son id", () => {
    const tache = new Task({ id: 42, title: "Apprendre Vitest" });
    expect(tache.id).toBe(42);
  });

  it("demarre en statut 'todo' par defaut", () => {
    const tache = new Task({ id: 1, title: "Demarrer le projet" });
    expect(tache.status).toBe("todo");
  });

  it("a une priorite 'medium' par defaut", () => {
    const tache = new Task({ id: 1, title: "Une tache" });
    expect(tache.priority).toBe("medium");
  });

  it("expose toDict() avec les bons champs", () => {
    const tache = new Task({ id: 1, title: "Voyager", priority: "high" });
    const d = tache.toDict();
    expect(d.id).toBe(1);
    expect(d.title).toBe("Voyager");
    expect(d.priority).toBe("high");
    expect(d.createdAt).toBeDefined();
  });

  it("utilise une description vide par defaut", () => {
    // Arrange
    const id = 10;
    const titre = "Tache sans description";
    // Act
    const tache = new Task({ id, title: titre });
    // Assert
    expect(tache.description).toBe("");
  });

  it("conserve une date ISO valide dans dueDate", () => {
    // Arrange
    const dueDate = "2026-11-15";
    // Act
    const tache = new Task({ id: 11, title: "Planifier", dueDate });
    // Assert
    expect(tache.dueDate).toBe(dueDate);
  });

  it("fromDict reconstruit une tache avec les champs attendus", () => {
    // Arrange
    const data = {
      id: 12,
      title: "Relire le cours",
      description: "Chapitre tests",
      priority: "low" as const,
      status: "doing" as const,
      dueDate: "2026-10-01",
      createdAt: "2026-05-12T09:00:00",
    };
    // Act
    const tache = Task.fromDict(data);
    // Assert
    expect(tache.toDict()).toEqual(data);
  });
});
