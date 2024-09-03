
package com.scat.security;

import com.scat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public WebSecurityConfig(@Lazy UserService userService, @Lazy BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors() 
            .and()
            .csrf().disable() 
            .authorizeRequests()
                .antMatchers(SecurityConstants.SIGNUP_URL, SecurityConstants.LOGIN_URL, "/users/forgot-password", "/users/reset-password").permitAll()
                .antMatchers("/admin/login").permitAll()
                .antMatchers("/users/crops/save", "/users/crops/all").permitAll() // Allow access to login without authentication
                .antMatchers("/crops/category/get/all", "/crops/categories/add").permitAll() // Allow access to login without authentication
                .anyRequest().authenticated() // Require authentication for all other endpoints
            .and()
            .addFilter(new AuthenticationFilter(authenticationManager())) // Add your custom filter here
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // Stateless session
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
