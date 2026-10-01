# Systemic Lens

This module makes the product's systemic dimension visible without turning shared exposure into an unsupported systemic-risk claim.

## Why it appears after bank-level recovery checks

The ordered recovery logic first establishes whether the recovery path is independent and whether the same workload can actually execute inside tolerance. Shared-demand and capacity questions are downstream. A capacity intervention is not justified while an earlier recovery condition is still binding.

## Public-safe supporting scenario

Synthetic institutions:
- Aurora Bank
- Meridian Bank
- Harbor Bank

Shared synthetic recovery fabric: **ResilienceGrid**.

Scenario state:
- S4 independent recovery: demonstrated;
- S5 actual execution: demonstrated within tolerance;
- simultaneous recovery demand set: 3 institutions;
- assured recovery capacity: UNKNOWN;
- entitlement / priority / coordination: UNKNOWN.

## Decision

The shared resource creates a legitimate capacity / coordination question, but it does **not** prove a shortage.

Expected output:
- S1–S6: GREEN;
- S7: AMBER_UNKNOWN;
- binding state: none;
- action: `MEASURE_CAPACITY` and obtain entitlement / priority evidence;
- B3 capacity shortage: **not asserted**.

## Product rule demonstrated

> Shared recovery resource ≠ demonstrated capacity shortage.

Capacity should be added only if measured simultaneous demand exceeds measured assured capacity after the upstream recovery conditions pass.

## Public-safety boundary

All institutions and the recovery provider in this module are synthetic. The module contains no private R2 row-level data, unpublished manuscript text, reviewer-sensitive material, proprietary third-party data, or real-bank confidential information.