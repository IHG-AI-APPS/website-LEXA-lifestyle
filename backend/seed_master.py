"""
Master Seed Script - LEXA Lifestyle Database
Orchestrates all seeding operations in correct order with proper error handling
"""

import asyncio
import os
import sys
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')


class SeedOrchestrator:
    def __init__(self):
        self.client = AsyncIOMotorClient(MONGO_URL)
        self.db = self.client[DB_NAME]
        self.results = {
            'success': [],
            'failed': [],
            'skipped': []
        }
        
    async def run_seed_module(self, module_name: str, description: str):
        """Run a seed module and track results"""
        print(f"\n{'='*60}")
        print(f"🌱 Seeding: {description}")
        print(f"   Module: {module_name}")
        print(f"{'='*60}")
        
        try:
            # Dynamically import and run the seed function
            module = __import__(module_name)
            
            # Find the main seed function (usually named seed_* or main)
            seed_func = None
            for attr_name in dir(module):
                if attr_name.startswith('seed_') and callable(getattr(module, attr_name)):
                    seed_func = getattr(module, attr_name)
                    break
            
            if seed_func:
                await seed_func()
                self.results['success'].append({
                    'module': module_name,
                    'description': description,
                    'timestamp': datetime.utcnow()
                })
                print(f"✅ SUCCESS: {description}")
            else:
                self.results['skipped'].append({
                    'module': module_name,
                    'reason': 'No seed function found'
                })
                print(f"⚠️  SKIPPED: No seed function in {module_name}")
                
        except Exception as e:
            self.results['failed'].append({
                'module': module_name,
                'description': description,
                'error': str(e)
            })
            print(f"❌ FAILED: {description}")
            print(f"   Error: {str(e)}")
    
    async def seed_all(self):
        """Execute all seeds in correct order"""
        start_time = datetime.utcnow()
        
        print(f"\n{'#'*60}")
        print(f"# LEXA LIFESTYLE - MASTER SEED ORCHESTRATOR")
        print(f"# Database: {DB_NAME}")
        print(f"# Started: {start_time.strftime('%Y-%m-%d %H:%M:%S UTC')}")
        print(f"{'#'*60}\n")
        
        # ===== PHASE 1: CORE DATA =====
        print("\n📦 PHASE 1: CORE DATA & FOUNDATION")
        print("-" * 60)
        
        await self.run_seed_module(
            'seed_all_solutions',
            'Solutions Catalog (Cinema, Smart Home, Lighting, Audio, Security)'
        )
        
        await self.run_seed_module(
            'seed_all_services',
            'Services Portfolio (Consulting, Engineering, Installation, Support)'
        )
        
        await self.run_seed_module(
            'seed_intelligence_solutions',
            'Intelligence & AI Solutions'
        )
        
        await self.run_seed_module(
            'seed_brands_products',
            'Brand Partners & Products (Control4, Crestron, Lutron, etc.)'
        )
        
        # ===== PHASE 2: PACKAGE SYSTEM =====
        print("\n\n📦 PHASE 2: SMART HOME PACKAGES")
        print("-" * 60)
        
        await self.run_seed_module(
            'seed_smart_home_packages',
            'Luxury Property Packages (Villas, Penthouses, Apartments)'
        )
        
        await self.run_seed_module(
            'seed_developer_apartments',
            'Developer Apartment Packages (Studio, 1BR, 2BR, 3BR)'
        )
        
        await self.run_seed_module(
            'seed_specialty_rooms',
            'Specialty Room Add-ons (Cinema, Wine Cellar, Game Room, etc.)'
        )
        
        await self.run_seed_module(
            'seed_package_enhancements',
            'Package Enhancements & Upgrades'
        )
        
        await self.run_seed_module(
            'seed_brand_options',
            'Brand Selection Options (Speakers, Lighting, Thermostats, etc.)'
        )
        
        # ===== PHASE 3: CONTENT & MEDIA =====
        print("\n\n📦 PHASE 3: CONTENT & MEDIA")
        print("-" * 60)
        
        await self.run_seed_module(
            'seed_blog_articles',
            'Blog Articles & Editorial Content'
        )
        
        await self.run_seed_module(
            'seed_news',
            'News & Press Releases'
        )
        
        await self.run_seed_module(
            'seed_videos',
            'Video Gallery & Case Studies'
        )
        
        # ===== PHASE 4: SEO & STRATEGIC CONTENT =====
        print("\n\n📦 PHASE 4: SEO & STRATEGIC CONTENT")
        print("-" * 60)
        
        # Note: Strategic blog batches can be run selectively
        print("ℹ️  Strategic blog batches (batch1-6) available but not auto-seeded")
        print("   Run individually if needed for SEO content")
        
        # ===== SUMMARY =====
        end_time = datetime.utcnow()
        duration = (end_time - start_time).total_seconds()
        
        print(f"\n\n{'#'*60}")
        print(f"# SEEDING COMPLETE")
        print(f"# Duration: {duration:.2f} seconds")
        print(f"{'#'*60}\n")
        
        print(f"✅ Success: {len(self.results['success'])} modules")
        for item in self.results['success']:
            print(f"   • {item['description']}")
        
        if self.results['failed']:
            print(f"\n❌ Failed: {len(self.results['failed'])} modules")
            for item in self.results['failed']:
                print(f"   • {item['description']}")
                print(f"     Error: {item['error']}")
        
        if self.results['skipped']:
            print(f"\n⚠️  Skipped: {len(self.results['skipped'])} modules")
            for item in self.results['skipped']:
                print(f"   • {item['module']} - {item['reason']}")
        
        self.client.close()
        
        # Return exit code
        return 0 if not self.results['failed'] else 1


async def seed_core_only():
    """Seed only core data (solutions, services, brands)"""
    orchestrator = SeedOrchestrator()
    
    print("\n🎯 QUICK SEED: Core Data Only\n")
    
    await orchestrator.run_seed_module('seed_all_solutions', 'Solutions')
    await orchestrator.run_seed_module('seed_all_services', 'Services')
    await orchestrator.run_seed_module('seed_brands_products', 'Brands')
    
    orchestrator.client.close()


async def seed_packages_only():
    """Seed only package system"""
    orchestrator = SeedOrchestrator()
    
    print("\n🎯 QUICK SEED: Package System Only\n")
    
    await orchestrator.run_seed_module('seed_smart_home_packages', 'Luxury Packages')
    await orchestrator.run_seed_module('seed_developer_apartments', 'Developer Apartments')
    await orchestrator.run_seed_module('seed_specialty_rooms', 'Specialty Rooms')
    await orchestrator.run_seed_module('seed_package_enhancements', 'Enhancements')
    await orchestrator.run_seed_module('seed_brand_options', 'Brand Options')
    
    orchestrator.client.close()


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='LEXA Lifestyle Database Seeding')
    parser.add_argument(
        '--mode',
        choices=['all', 'core', 'packages'],
        default='all',
        help='Seeding mode: all (everything), core (solutions/services), packages (package system)'
    )
    
    args = parser.parse_args()
    
    if args.mode == 'core':
        asyncio.run(seed_core_only())
    elif args.mode == 'packages':
        asyncio.run(seed_packages_only())
    else:
        orchestrator = SeedOrchestrator()
        exit_code = asyncio.run(orchestrator.seed_all())
        sys.exit(exit_code)
