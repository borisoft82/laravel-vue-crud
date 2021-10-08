<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div class="container">
                    <a class="navbar-brand" href="#">
                        CRUD
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <router-link 
                                        active-class="active-item" 
                                        exact 
                                        :to="{ name: 'posts.index' }" 
                                        class="nav-link">Posts
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link 
                                    active-class="active-item" 
                                    exact 
                                    :to="{ name: 'posts.create' }" 
                                    class="nav-link">Add new post
                                    </router-link>
                                </li>
                              </ul>
                        </ul>
                    </div>
                </div>
            </nav>

            <main class="py-4">
                <div class="container">
                    <router-view></router-view>
                </div>
            </main>
        </div>
</template>