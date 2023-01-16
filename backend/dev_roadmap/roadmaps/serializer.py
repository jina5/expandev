from .models import Node, Track, RecommendContent, Interview, Review

from rest_framework import serializers


class RecommendContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = RecommendContent
        fields = '__all__'


class InterviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Interview
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Review
        fields = '__all__'


class NodeDetailSerializer(serializers.ModelSerializer):
    recommend_content = RecommendContentSerializer(many=True)
    interview = InterviewSerializer(many=True)
    review = ReviewSerializer(many=True)

    class Meta:
        model = Node
        fields = ('id', 'isEssential', 'isComplete', 'title', 'content', 'purpose', 'recommend_content', 'interview', 'review')


class Nodeserializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()

    class Meta:
        model = Node
        exclude = ('parent', )

    def get_childs(self, object):
        serializer = Nodeserializer(object.childs.all(), many=True)
        data = serializer.data
        return data if data else None


class MainNodeSerializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()

    class Meta:
        model = Node
        exclude = ('parent', )

    def get_childs(self, object):
        serializer = Nodeserializer(object.childs.all(), many=True)
        return serializer.data


class TrackSerializer(serializers.ModelSerializer):
    nodesData = serializers.SerializerMethodField()
    
    class Meta:
        model = Track
        fields = ('__all__')
        read_only_fields = ('nodes', )

    def get_nodesData(self, object):
        temp_node = []
        for node in object.nodes.all():
            if not node.parent:
                temp_node.append(node)
        serializer = MainNodeSerializer(temp_node, many=True)
        return serializer.data