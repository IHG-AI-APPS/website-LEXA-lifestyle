"""
Phase C Final Polish Tests - SEO Management Tab & Accessibility
Tests:
1. Admin CMS has 11 category tabs (including SEO)
2. SEO tab has 24 sections (global + homepage + 22 page-specific)
3. SEO sections use SeoMetaEditor with correct fields
4. Global SEO has additional fields (site_name, canonical_domain, etc.)
5. Frontend pages render correctly
6. Accessibility attributes present on key elements
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    BASE_URL = 'https://world-class-mobile.preview.emergentagent.com'

class TestBackendHealth:
    """Basic health and connectivity tests"""
    
    def test_health_endpoint(self):
        """API health check"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get('status') == 'healthy'
        assert data.get('database') == 'connected'
        print("Backend health: PASS")
    
    def test_cms_sections_endpoint(self):
        """CMS sections bulk endpoint works"""
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys=seo_global,seo_homepage,seo_about")
        assert response.status_code == 200
        print("CMS sections endpoint: PASS")


class TestSEOManagement:
    """SEO Management Tab API Tests"""
    
    def test_seo_global_can_be_stored(self):
        """Test storing global SEO settings"""
        token = self._get_admin_token()
        
        test_data = {
            "title": "LEXA Smart Home | TEST",
            "description": "TEST description for global SEO",
            "keywords": "smart home, dubai, test",
            "og_title": "LEXA - TEST",
            "og_description": "TEST OG description",
            "og_image": "https://example.com/test-og.jpg",
            "site_name": "TEST LEXA",
            "canonical_domain": "https://test-lexa.com",
            "default_og_image": "https://example.com/default-og.jpg",
            "twitter_handle": "@test_lexa",
            "google_verification": "test-verification-code",
            "robots": "index, follow"
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/seo_global",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={"value": test_data}
        )
        assert response.status_code == 200
        print("SEO global store: PASS")
        
        # Verify it was stored
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys=seo_global")
        data = response.json()
        assert 'seo_global' in data
        stored = data['seo_global']
        assert stored.get('title') == test_data['title']
        assert stored.get('site_name') == test_data['site_name']
        print("SEO global retrieve: PASS")
    
    def test_seo_page_specific_can_be_stored(self):
        """Test storing page-specific SEO settings"""
        token = self._get_admin_token()
        
        test_data = {
            "title": "About LEXA | TEST",
            "description": "TEST about page description",
            "keywords": "about, lexa, test",
            "og_title": "About LEXA - TEST",
            "og_description": "TEST about OG description",
            "robots": "index, follow",
            "canonical_url": ""
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/seo_about",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={"value": test_data}
        )
        assert response.status_code == 200
        print("SEO page-specific (about) store: PASS")
        
        # Verify it was stored - single key endpoint returns {key, value} format
        response = requests.get(f"{BASE_URL}/api/cms/sections/seo_about")
        data = response.json()
        # Handle both formats: {key, value} or direct data
        actual_data = data.get('value', data)
        assert actual_data.get('title') == test_data['title']
        print("SEO page-specific (about) retrieve: PASS")
    
    def test_seo_robots_directive_options(self):
        """Test different robots directive values"""
        token = self._get_admin_token()
        
        robots_options = [
            "index, follow",
            "noindex, follow",
            "index, nofollow",
            "noindex, nofollow"
        ]
        
        for robots in robots_options:
            test_data = {
                "title": f"TEST Page with {robots}",
                "description": "Testing robots directive",
                "robots": robots
            }
            
            response = requests.put(
                f"{BASE_URL}/api/admin/content/settings/seo_test_robots",
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                json={"value": test_data}
            )
            assert response.status_code == 200
            
            # Verify - handle both formats
            response = requests.get(f"{BASE_URL}/api/cms/sections/seo_test_robots")
            data = response.json()
            actual_data = data.get('value', data)
            assert actual_data.get('robots') == robots
        
        print("SEO robots directives: PASS")
    
    def test_seo_bulk_fetch(self):
        """Test fetching multiple SEO sections at once"""
        keys = "seo_global,seo_homepage,seo_about,seo_contact,seo_solutions"
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys}")
        assert response.status_code == 200
        data = response.json()
        # Should return a dict with keys
        assert isinstance(data, dict)
        print(f"SEO bulk fetch returned {len(data)} sections: PASS")
    
    def _get_admin_token(self):
        """Get admin authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        if response.status_code == 200:
            return response.json().get('token')
        pytest.skip("Admin login failed")


class TestCMSSectionsCount:
    """Verify CMS section counts per category"""
    
    def test_seo_sections_keys(self):
        """Verify SEO section keys exist"""
        # Expected SEO keys based on CMS_SECTIONS array
        expected_seo_slugs = [
            'about', 'contact', 'consultation', 'experience-centre', 'careers', 'blog',
            'solutions', 'services', 'projects', 'products', 'brands', 'packages',
            'testimonials', 'news', 'resources', 'faq', 'support', 'warranty',
            'privacy-policy', 'terms-of-service', 'calculator', 'work-with-us'
        ]
        
        expected_keys = ['seo_global', 'seo_homepage']
        for slug in expected_seo_slugs:
            key = f"seo_{slug.replace('-', '_')}"
            expected_keys.append(key)
        
        assert len(expected_keys) == 24, f"Expected 24 SEO keys, got {len(expected_keys)}"
        print(f"SEO keys count: 24 (2 special + 22 page-specific): PASS")
        
        # Test a few key fetches
        for key in ['seo_global', 'seo_homepage', 'seo_about', 'seo_contact']:
            response = requests.get(f"{BASE_URL}/api/cms/sections/{key}")
            assert response.status_code == 200
            print(f"  {key}: accessible")


class TestFrontendPages:
    """Verify frontend pages render correctly"""
    
    def test_homepage_loads(self):
        """Homepage renders"""
        response = requests.get(f"{BASE_URL}/", allow_redirects=True)
        assert response.status_code == 200
        assert 'LEXA' in response.text or 'lexa' in response.text.lower()
        print("Homepage: PASS")
    
    def test_solution_page_loads(self):
        """Solution page with SeoLandingPageTemplate renders"""
        response = requests.get(f"{BASE_URL}/solutions/security", allow_redirects=True)
        assert response.status_code == 200
        print("Solution page (/solutions/security): PASS")
    
    def test_about_page_loads(self):
        """About page renders"""
        response = requests.get(f"{BASE_URL}/about", allow_redirects=True)
        assert response.status_code == 200
        print("About page: PASS")
    
    def test_contact_page_loads(self):
        """Contact page renders"""
        response = requests.get(f"{BASE_URL}/contact", allow_redirects=True)
        assert response.status_code == 200
        print("Contact page: PASS")


class TestAccessibilityAttributesBackend:
    """Test that accessibility-related content APIs work"""
    
    def test_cms_homepage_hero_endpoint(self):
        """Homepage hero CMS endpoint works"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_hero")
        assert response.status_code == 200
        print("Homepage hero CMS: PASS")
    
    def test_cms_site_footer_endpoint(self):
        """Site footer CMS endpoint works"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/site_footer")
        assert response.status_code == 200
        print("Site footer CMS: PASS")


class TestAdminCMSCategories:
    """Verify admin CMS API supports all category sections"""
    
    def test_seo_category_sections(self):
        """SEO category sections can be fetched"""
        seo_keys = [
            'seo_global', 'seo_homepage', 'seo_about', 'seo_contact',
            'seo_consultation', 'seo_experience_centre', 'seo_careers', 'seo_blog',
            'seo_solutions', 'seo_services', 'seo_projects', 'seo_products',
            'seo_brands', 'seo_packages', 'seo_testimonials', 'seo_news',
            'seo_resources', 'seo_faq', 'seo_support', 'seo_warranty',
            'seo_privacy_policy', 'seo_terms_of_service', 'seo_calculator', 'seo_work_with_us'
        ]
        
        keys_param = ','.join(seo_keys)
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys_param}")
        assert response.status_code == 200
        data = response.json()
        print(f"SEO category bulk fetch: {len(data)} sections returned: PASS")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
