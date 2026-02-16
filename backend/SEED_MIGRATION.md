# Seed Scripts Migration Notes

## ⚠️ Deprecated Scripts

The following scripts are deprecated or superseded by the new organized seeding system:

### Superseded by seed_all_solutions.py:
- `seed_new_solutions.py` - Additional solutions (now merged)
- `seed_phase2_solutions.py` - Phase 2 solutions (now merged)

### Superseded by Package System:
- `seed_luxury_residential.py` - Replaced by seed_smart_home_packages.py
- `seed_remaining_properties.py` - Replaced by package system

### General Deprecation:
- `seed_data.py` - Legacy basic seeding (use seed_master.py)
- `seed_new_pages.py` - Check if still needed

### Strategic Blogs:
The 6 strategic blog batch files are intentionally excluded from automatic seeding:
- `seed_strategic_blogs.py` (batch 1-6)
- Run manually for SEO campaigns only

## Migration Path

**Old Way (Fragmented):**
```bash
python seed_all_solutions.py
python seed_new_solutions.py  # Might conflict
python seed_phase2_solutions.py  # Might conflict
python seed_smart_home_packages.py
python seed_developer_apartments.py
# ... many more scripts
```

**New Way (Organized):**
```bash
# Option 1: Seed everything
python seed_master.py --mode all

# Option 2: Seed specific phases
python seed_master.py --mode core      # Solutions, services, brands
python seed_master.py --mode packages  # Package system only

# Option 3: Individual scripts (still work)
python seed_all_solutions.py
python seed_smart_home_packages.py
```

## Benefits of New System

1. **No Conflicts**: Scripts run in correct order
2. **Error Tracking**: Master orchestrator tracks success/failures
3. **Documentation**: SEEDING_GUIDE.md documents all scripts
4. **Selective Seeding**: Choose what to seed with --mode flag
5. **Maintainability**: Easy to add new seeds or remove old ones

## For Developers

When adding new seed scripts:
1. Create new script following naming convention
2. Add to seed_master.py in appropriate phase
3. Document in SEEDING_GUIDE.md
4. Test with master orchestrator

When deprecating old scripts:
1. Add warning in this file
2. Update SEEDING_GUIDE.md 
3. Eventually move to seeds/deprecated/ folder
4. Do not delete (keep for reference)
