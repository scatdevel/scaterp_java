package com.scat.shared;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "mady64789897uujhaj89kjljtrt";

    public String generateToken(String email, Set<String> roles) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("roles", roles.stream().map(role -> "ROLE_" + role).collect(Collectors.toSet()));
        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour validity
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
    }

    public Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public String extractEmail(String token) {
        Claims claims = extractClaims(token);
        return claims != null ? claims.getSubject() : null;
    }

    public boolean isTokenExpired(String token) {
        Claims claims = extractClaims(token);
        return claims != null && claims.getExpiration().before(new Date());
    }

    public boolean validateToken(String token, String email) {
        String extractedEmail = extractEmail(token);
        return (extractedEmail != null && extractedEmail.equals(email) && !isTokenExpired(token));
    }

    public Set<String> extractRoles(String token) {
        Claims claims = extractClaims(token);
        Set<String> roles = new HashSet<>();
        if (claims != null && claims.get("roles") != null) {
            List<?> rolesList = claims.get("roles", List.class);
            for (Object role : rolesList) {
                if (role instanceof String) {
                    roles.add(((String) role).replace("ROLE_", ""));
                }
            }
        }
        return roles;
    }
}

