attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Normal;

uniform mat4 u_MvpMatrix;
uniform mat4 u_NormalMatrix;  
uniform mat4 u_ModelMatrix;  
uniform vec3 u_LightColor;    
uniform vec3 u_LightPosition; // Position of the light source (in the world coordinate system)
uniform vec3 u_AmbientLight;
varying vec4 v_Color;
void main() {
  gl_Position = u_MvpMatrix * a_Position;
  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));
  
  // Calculate world coordinate of vertex
  vec4 vertexPosition = u_ModelMatrix * a_Position;
  
  // Calculate the light direction and make it 1.0 in length
  vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));
  
  // The dot product of the light direction and the normal
  float nDotL = max(dot(lightDirection, normal), 0.0);
  
  // Calculate the color due to diffuse reflection
  vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;
  
  // Calculate the color due to ambient reflection
  vec3 ambient = u_AmbientLight * a_Color.rgb;
  
  //  Add the surface colors due to diffuse reflection and ambient reflection
  v_Color = vec4(diffuse + ambient, a_Color.a); 
}