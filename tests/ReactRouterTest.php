<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CoursesViewTest extends WebTestCase
{
    public function testReactRouterHandler()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', 'main/browse-courses');

        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertSame(1, $crawler->filter('div')->count()); //page must have main container div for react to render
    }
}
